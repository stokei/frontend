import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { CheckoutStep } from "@/constants/checkout-steps";
import {
  useAPIErrors,
  useCurrentApp,
  useShoppingCart,
  useTranslations,
} from "@/hooks";
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
import { useGetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";
import { CheckoutLayout } from "../../layout";
import { useCreateCheckoutMutation } from "./graphql/create-checkout.mutation.graphql.generated";
import { useCreateOrderMutation } from "./graphql/create-order.mutation.graphql.generated";
import { CreatePixAccountStep } from "./steps/create-pix-account";
import { PaymentStep } from "./steps/payment";
import { PaymentMethodStep } from "./steps/payment-method";
import { ProductsStep } from "./steps/products";
import { SummaryStep } from "./steps/summary";

interface CheckoutPageProps {}

export const CheckoutPage: FC<CheckoutPageProps> = () => {
  const [qrCodeCopyAndPaste, setQRCodeCopyAndPaste] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isDisabledCreatePixAccount, setIsDisabledCreatePixAccount] =
    useState(true);
  const [isDisabledPayment, setIsDisabledPayment] = useState(true);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.PRODUCTS
  );
  const [paymentMethodType, setPaymentMethodType] =
    useState<PaymentMethodType>();
  const translate = useTranslations();
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const { onShowAPIError } = useAPIErrors();
  const { shoppingCartItems, isEmptyShoppingCart } = useShoppingCart();

  const [{ fetching: isLoadingCheckout }, onExecuteCheckout] =
    useCreateCheckoutMutation();

  const [{ fetching: isLoadingOrder }, onExecuteOrder] =
    useCreateOrderMutation();

  useEffect(() => {
    if (currentApp?.isIntegratedWithStripe) {
      setPaymentMethodType(PaymentMethodType.Card);
    } else if (currentApp?.isIntegratedWithPix) {
      setPaymentMethodType(PaymentMethodType.Pix);
    } else {
      setPaymentMethodType(undefined);
    }
  }, [currentApp]);

  useEffect(() => {
    setIsDisabledCreatePixAccount(
      paymentMethodType !== PaymentMethodType.Pix ||
        !!currentAccount?.pagarmeCustomer
    );
  }, [currentAccount?.pagarmeCustomer, paymentMethodType]);

  const goToSummary = useCallback(() => {
    return setCurrentStep(CheckoutStep.SUMMARY);
  }, []);

  const goToSummaryOrCreatePixAccount = useCallback(() => {
    if (paymentMethodType === PaymentMethodType.Pix) {
      if (!currentAccount) {
        router.push({
          pathname: routes.auth.login,
          query: { redirectTo: router.asPath },
        });
        return;
      }
      if (!currentAccount?.pagarmeCustomer) {
        return setCurrentStep(CheckoutStep.CREATE_PIX_ACCOUNT);
      }
    }
    return goToSummary();
  }, [currentAccount, goToSummary, paymentMethodType, router]);

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
            paymentMethodType,
          },
        });

        if (!!response?.data?.createCheckout) {
          const checkout = response.data.createCheckout;
          if (checkout.pix) {
            setQRCodeCopyAndPaste(checkout.pix?.copyAndPaste || "");
            setQRCodeURL(checkout.pix?.qrCodeURL || "");
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
    [onExecuteCheckout, onShowAPIError, paymentMethodType, router, translate]
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
          width={["full", "full", "700px", "700px"]}
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
                title={translate.formatMessage({ id: "paymentMethod" })}
                stepIndex={CheckoutStep.PAYMENT_METHOD}
                isDisabled={isEmptyShoppingCart}
              />
              {!isDisabledCreatePixAccount && (
                <StepItem
                  title={translate.formatMessage({ id: "account" })}
                  stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}
                  isDisabled={isEmptyShoppingCart || !paymentMethodType}
                />
              )}
              <StepItem
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={CheckoutStep.SUMMARY}
                isDisabled={isEmptyShoppingCart || !paymentMethodType}
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
                      onNextStep={() =>
                        setCurrentStep(CheckoutStep.PAYMENT_METHOD)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT_METHOD}>
                    <PaymentMethodStep
                      paymentMethodType={paymentMethodType}
                      onChoosePaymentMethod={setPaymentMethodType}
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.PRODUCTS)
                      }
                      onNextStep={goToSummaryOrCreatePixAccount}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}>
                    <CreatePixAccountStep
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.PRODUCTS)
                      }
                      onNextStep={() => {
                        setIsDisabledCreatePixAccount(true);
                        goToSummary();
                      }}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.SUMMARY}>
                    <SummaryStep
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
                      qrCodeCopyAndPaste={qrCodeCopyAndPaste}
                      qrCodeURL={qrCodeURL}
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
