import { CheckoutStep } from "@/constants/checkout-steps";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import {
  CreateOrderItemInput,
  PaymentGatewayType,
  PaymentMethodType,
} from "@/services/graphql/stokei";
import { useShoppingCart } from "@stokei/builder";
import { appRoutes } from "@stokei/routes";
import {
  Box,
  Card,
  CardBody,
  Container,
  StepItem,
  StepList,
  StepPanel,
  StepPanels,
  Steps,
  useActiveSteps,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { CheckoutLayout } from "../../layout";
import { useGetCheckoutPageApplyCouponToValueQuery } from "./graphql/apply-coupon-to-value.query.graphql.generated";
import { CheckoutPageCouponFragment } from "./graphql/coupon.query.graphql.generated";
import {
  useCreateCheckoutMutation
} from "./graphql/create-checkout.mutation.graphql.generated";
import { useCreateOrderMutation } from "./graphql/create-order.mutation.graphql.generated";
import { PaymentMethodStep } from "./steps/payment-method";
import { ProductsStep } from "./steps/products";
import { SummaryStep } from "./steps/summary";
import { PaymentStatus } from "@/views/checkout/pages/callback";
import { usePlugins } from "@/hooks/use-plugins";

export const CheckoutPage = () => {
  const { activeSteps, onActivateStep } =
    useActiveSteps<CheckoutStep>({
      initialState: {
        [CheckoutStep.PRODUCTS]: true,
        [CheckoutStep.PAYMENT_METHOD]: false,
        [CheckoutStep.SUMMARY]: false,
      },
    });
  const [orderId, setOrderId] = useState("");
  const [coupon, setCoupon] = useState<CheckoutPageCouponFragment>();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.PRODUCTS
  );
  const [paymentMethodType, setPaymentMethodType] =
    useState<PaymentMethodType>();

  const translate = useTranslations();
  const router = useRouter();
  const { isAuthenticated } = useCurrentAccount();
  const { onShowAPIError } = useAPIErrors();
  const { shoppingCartItems, totalAmount: shoppingCartTotalAmount } =
    useShoppingCart();
  const {
    defaultPaymentGateway
  } = usePlugins();

  const [{ fetching: isLoadingCheckout }, onExecuteCheckout] =
    useCreateCheckoutMutation();

  const [{ fetching: isLoadingOrder }, onExecuteOrder] =
    useCreateOrderMutation();

  const [
    {
      fetching: isLoadingGetApplyCouponToValue,
      data: dataGetApplyCouponToValue,
    },
  ] = useGetCheckoutPageApplyCouponToValueQuery({
    pause: !coupon?.id || !shoppingCartTotalAmount,
    variables: {
      input: {
        coupon: coupon?.id || "",
        value: shoppingCartTotalAmount,
      },
    },
  });

  const { totalAmount, couponDiscountAmount } = useMemo(() => {
    if (!coupon || !dataGetApplyCouponToValue?.applyCouponToValue) {
      return {
        totalAmount: shoppingCartTotalAmount,
        couponDiscountAmount: undefined,
      };
    }
    return {
      totalAmount: dataGetApplyCouponToValue?.applyCouponToValue?.totalAmount,
      couponDiscountAmount:
        dataGetApplyCouponToValue?.applyCouponToValue?.discountAmount,
    };
  }, [
    dataGetApplyCouponToValue?.applyCouponToValue,
    shoppingCartTotalAmount,
    coupon,
  ]);

  const onCreateOrder = useCallback(async () => {
    if (!isAuthenticated) {
      router.push({
        pathname: appRoutes.auth.login,
        query: { redirectTo: router.asPath },
      });
      return;
    }
    try {
      const orderItems: CreateOrderItemInput[] = shoppingCartItems.map(
        (shoppingCartItem) => ({
          price: shoppingCartItem.price?.id || "",
        })
      );
      const response = await onExecuteOrder({
        input: {
          items: orderItems,
          coupon: coupon?.id,
        },
      });

      if (!!response?.data?.createOrder) {
        const order = response.data.createOrder;
        setOrderId(order?.id);
        return order;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({
        message: translate.formatMessage({ id: "somethingWentWrong" }),
      });
    }
  }, [
    coupon?.id,
    isAuthenticated,
    onExecuteOrder,
    onShowAPIError,
    router,
    shoppingCartItems,
    translate,
  ]);

  const onCreatePayment = useCallback(
    async (order: string) => {
      try {
        if (!paymentMethodType || !defaultPaymentGateway?.type) {
          onShowAPIError({
            message: translate.formatMessage({ id: "paymentMethodNotFound" }),
          });
          return;
        }
        const isDefaultPaymentMethod = [PaymentMethodType.Boleto, PaymentMethodType.Card, PaymentMethodType.Pix].includes(paymentMethodType)
        const response = await onExecuteCheckout({
          input: {
            order,
            cancelURL: new URL(appRoutes.checkout.home, window.location.origin).toString(),
            successURL: new URL(`${appRoutes.checkout.callback}?redirect_status=${PaymentStatus.SUCCEEDED}`, window.location.origin).toString(),
            paymentGatewayType: (isDefaultPaymentMethod ? defaultPaymentGateway?.type : paymentMethodType) as unknown as PaymentGatewayType,
          },
        });

        if (!!response?.data?.createCheckout) {
          const checkout = response.data.createCheckout;
          if (checkout.url) {
            return router.push(checkout.url);
          }
          onShowAPIError({
            message: translate.formatMessage({ id: "somethingWentWrong" }),
          });
        }
        if (!!response.error?.graphQLErrors?.length) {
          response.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
        }
      } catch (error) {
        onShowAPIError({
          message: translate.formatMessage({ id: "somethingWentWrong" }),
        });
      }
    },
    [defaultPaymentGateway?.type, onExecuteCheckout, onShowAPIError, paymentMethodType, router, translate]
  );

  const onGoToProductsStep = () => {
    setCurrentStep(CheckoutStep.PRODUCTS);
  };
  const onGoToPaymentMethodStep = () => {
    onActivateStep(CheckoutStep.PAYMENT_METHOD);
    setCurrentStep(CheckoutStep.PAYMENT_METHOD);
  };
  const onGoToSummaryStep = () => {
    onActivateStep(CheckoutStep.SUMMARY);
    setCurrentStep(CheckoutStep.SUMMARY);
  };

  const onGoToPayment = async () => {
    let currentOrderId = orderId;
    if (!currentOrderId) {
      const order = await onCreateOrder();
      if (order?.id) {
        currentOrderId = order.id;
      }
    }
    if (!currentOrderId) {
      return;
    }
    return await onCreatePayment(currentOrderId);
  };

  return (
    <CheckoutLayout>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "full", "900px"]}
          height="fit-content"
          flexDirection="column"
        >
          <Steps
            currentStep={currentStep}
            onChangeStep={(step) => setCurrentStep(step)}
          >
            <StepList justify="center" align="center">
              <StepItem
                title={translate.formatMessage({ id: "products" })}
                stepIndex={CheckoutStep.PRODUCTS}
                isCompleted={activeSteps?.[CheckoutStep.PAYMENT_METHOD]}
              />
              <StepItem
                title={translate.formatMessage({ id: "paymentMethod" })}
                stepIndex={CheckoutStep.PAYMENT_METHOD}
                isDisabled={!activeSteps?.[CheckoutStep.PAYMENT_METHOD]}
                isCompleted={activeSteps?.[CheckoutStep.SUMMARY]}
              />
              <StepItem
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={CheckoutStep.SUMMARY}
                isDisabled={!activeSteps?.[CheckoutStep.SUMMARY]}
                isCompleted={activeSteps?.[CheckoutStep.SUMMARY]}
              />
            </StepList>
            <StepPanels>
              <Card background="background.50">
                <CardBody>
                  <StepPanel stepIndex={CheckoutStep.PRODUCTS}>
                    <ProductsStep onNextStep={onGoToPaymentMethodStep} />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT_METHOD}>
                    <PaymentMethodStep
                      paymentMethodType={paymentMethodType}
                      onChoosePaymentMethodType={setPaymentMethodType}
                      onPreviousStep={onGoToProductsStep}
                      onNextStep={onGoToSummaryStep}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.SUMMARY}>
                    <SummaryStep
                      coupon={coupon}
                      onChangeCoupon={setCoupon}
                      totalAmount={totalAmount}
                      couponDiscountAmount={couponDiscountAmount}
                      isLoadingGetApplyCouponToValue={
                        isLoadingGetApplyCouponToValue
                      }
                      paymentMethodType={paymentMethodType}
                      isLoadingCheckout={isLoadingCheckout || isLoadingOrder}
                      onGoToProducts={onGoToProductsStep}
                      onGoToPaymentMethod={onGoToPaymentMethodStep}
                      onPreviousStep={onGoToPaymentMethodStep}
                      onNextStep={onGoToPayment}
                    />
                  </StepPanel>
                </CardBody>
              </Card>
            </StepPanels>
          </Steps>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
