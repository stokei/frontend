import { CheckoutStep } from "@/constants/checkout-steps";
import { useAPIErrors, useShoppingCart, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  CreateOrderItemInput,
  PaymentMethodType,
} from "@/services/graphql/stokei";
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
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { CheckoutLayout } from "../../layout";
import {
  CreateCheckoutPageCheckoutFragment,
  useCreateCheckoutMutation,
} from "./graphql/create-checkout.mutation.graphql.generated";
import { useCreateOrderMutation } from "./graphql/create-order.mutation.graphql.generated";
import { AccountStep } from "./steps/account";
import { AddressStep } from "./steps/address";
import { PaymentStep } from "./steps/payment";
import { PaymentMethodStep } from "./steps/payment-method";
import { ProductsStep } from "./steps/products";
import { SummaryStep } from "./steps/summary";
import { AddressManagementAddressFragment } from "@/components/address-management/graphql/addresses.query.graphql.generated";
import { PaymentMethodManagementPaymentMethodCardFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { CheckoutPageCouponFragment } from "./graphql/coupon.query.graphql.generated";
import { useGetCheckoutPageApplyCouponToValueQuery } from "./graphql/apply-coupon-to-value.query.graphql.generated";

interface CheckoutPageProps {}

export const CheckoutPage: FC<CheckoutPageProps> = () => {
  const [address, setAddress] = useState<AddressManagementAddressFragment>();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodManagementPaymentMethodCardFragment>();
  const [checkoutResponsePix, setCheckoutResponsePix] =
    useState<CreateCheckoutPageCheckoutFragment["pix"]>();
  const [checkoutResponseBoleto, setCheckoutResponseBoleto] =
    useState<CreateCheckoutPageCheckoutFragment["boleto"]>();
  const [orderId, setOrderId] = useState("");
  const [isDisabledPayment, setIsDisabledPayment] = useState(true);
  const [coupon, setCoupon] = useState<CheckoutPageCouponFragment>();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.PRODUCTS
  );
  const [paymentMethodType, setPaymentMethodType] =
    useState<PaymentMethodType>();
  const translate = useTranslations();
  const router = useRouter();
  const { currentAccount } = useCurrentAccount();
  const { onShowAPIError } = useAPIErrors();
  const {
    shoppingCartItems,
    isEmptyShoppingCart,
    totalAmount: shoppingCartTotalAmount,
  } = useShoppingCart();
  const accountStepIsDisabled =
    isEmptyShoppingCart ||
    !currentAccount?.pagarmeCustomer ||
    !currentAccount?.document ||
    !currentAccount?.phone ||
    !currentAccount?.dateBirthday;

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

  useEffect(() => {
    if (paymentMethodType !== PaymentMethodType.Card) {
      setPaymentMethod(undefined);
    }
  }, [paymentMethodType]);

  const onCreateOrder = useCallback(async () => {
    if (!currentAccount) {
      router.push({
        pathname: routes.auth.login,
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
    currentAccount,
    onExecuteOrder,
    onShowAPIError,
    router,
    shoppingCartItems,
    translate,
  ]);

  const onCreatePayment = useCallback(
    async (order: string) => {
      try {
        if (!paymentMethodType) {
          onShowAPIError({
            message: translate.formatMessage({ id: "paymentMethodNotFound" }),
          });
          return;
        }
        const response = await onExecuteCheckout({
          input: {
            order,
            paymentMethod: paymentMethod?.id,
            paymentMethodType,
          },
        });

        if (!!response?.data?.createCheckout) {
          const checkout = response.data.createCheckout;
          if (paymentMethodType === PaymentMethodType.Card) {
            if (checkout.card) {
              return router.push(routes.checkout.callback);
            } else {
              return onShowAPIError({
                message: translate.formatMessage({ id: "somethingWentWrong" }),
              });
            }
          }
          if (checkout.pix) {
            setCheckoutResponsePix(checkout.pix);
          }
          if (checkout.boleto) {
            setCheckoutResponseBoleto(checkout.boleto);
          }
          setIsDisabledPayment(false);
          if (checkout.url) {
            return router.push(checkout.url);
          }
          return setCurrentStep(CheckoutStep.PAYMENT);
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
    [
      onExecuteCheckout,
      onShowAPIError,
      paymentMethod?.id,
      paymentMethodType,
      router,
      translate,
    ]
  );

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
              />
              <StepItem
                title={translate.formatMessage({ id: "account" })}
                stepIndex={CheckoutStep.ACCOUNT}
                isDisabled={accountStepIsDisabled}
              />
              <StepItem
                title={translate.formatMessage({ id: "address" })}
                stepIndex={CheckoutStep.ADDRESS}
                isDisabled={
                  accountStepIsDisabled || !currentAccount?.pagarmeCustomer
                }
              />
              <StepItem
                title={translate.formatMessage({ id: "paymentMethod" })}
                stepIndex={CheckoutStep.PAYMENT_METHOD}
                isDisabled={
                  accountStepIsDisabled ||
                  !address ||
                  !currentAccount?.pagarmeCustomer
                }
              />
              <StepItem
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={CheckoutStep.SUMMARY}
                isDisabled={
                  accountStepIsDisabled ||
                  !address ||
                  !currentAccount?.pagarmeCustomer ||
                  !paymentMethodType
                }
              />
              <StepItem
                title={translate.formatMessage({ id: "payment" })}
                stepIndex={CheckoutStep.PAYMENT}
                isDisabled={isDisabledPayment}
              />
            </StepList>
            <StepPanels>
              <Card background="background.50">
                <CardBody>
                  <StepPanel stepIndex={CheckoutStep.PRODUCTS}>
                    <ProductsStep
                      onNextStep={() => setCurrentStep(CheckoutStep.ACCOUNT)}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.ACCOUNT}>
                    <AccountStep
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.PRODUCTS)
                      }
                      onNextStep={() => setCurrentStep(CheckoutStep.ADDRESS)}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.ADDRESS}>
                    <AddressStep
                      address={address}
                      onChangeAddress={setAddress}
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.ACCOUNT)
                      }
                      onNextStep={() =>
                        setCurrentStep(CheckoutStep.PAYMENT_METHOD)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT_METHOD}>
                    <PaymentMethodStep
                      address={address}
                      paymentMethod={paymentMethod}
                      paymentMethodType={paymentMethodType}
                      onChoosePaymentMethod={setPaymentMethod}
                      onChoosePaymentMethodType={setPaymentMethodType}
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.ADDRESS)
                      }
                      onNextStep={() => setCurrentStep(CheckoutStep.SUMMARY)}
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
                      paymentMethod={paymentMethod}
                      paymentMethodType={paymentMethodType}
                      isLoadingCheckout={isLoadingCheckout || isLoadingOrder}
                      onGoToProducts={() =>
                        setCurrentStep(CheckoutStep.PRODUCTS)
                      }
                      onGoToPaymentMethod={() =>
                        setCurrentStep(CheckoutStep.PAYMENT_METHOD)
                      }
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.PAYMENT_METHOD)
                      }
                      onNextStep={onGoToPayment}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT}>
                    <PaymentStep
                      orderId={orderId}
                      totalAmount={totalAmount}
                      pix={checkoutResponsePix}
                      boleto={checkoutResponseBoleto}
                      paymentMethodType={paymentMethodType}
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.PAYMENT_METHOD)
                      }
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
