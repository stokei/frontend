import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { CheckoutStep } from "@/constants/checkout-steps";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { PaymentMethodType } from "@/services/graphql/stokei";
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
import { SubscriptionStep } from "./steps/subscription";
import { SummaryStep } from "./steps/summary";

interface CheckoutPageProps {
  readonly productId: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({ productId }) => {
  const [qrCodeCopyAndPaste, setQRCodeCopyAndPaste] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [orderId, setOrderId] = useState("");
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const [isDisabledCreatePixAccount, setIsDisabledCreatePixAccount] =
    useState(true);
  const [isDisabledPayment, setIsDisabledPayment] = useState(true);
  const translate = useTranslations();
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const { onShowAPIError } = useAPIErrors();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.SUBSCRIPTION
  );
  const [paymentMethodType, setPaymentMethodType] = useState<PaymentMethodType>(
    PaymentMethodType.Card
  );

  const [{ fetching: isLoadingCheckout }, onExecuteCheckout] =
    useCreateCheckoutMutation();

  const [{ fetching: isLoadingOrder }, onExecuteOrder] =
    useCreateOrderMutation();

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);
  const priceURLParamId = useMemo(
    () => router.query?.price?.toString() || "",
    [router.query?.price]
  );

  useEffect(() => {
    if (currentApp?.isIntegratedWithStripe) {
      setPaymentMethodType(PaymentMethodType.Card);
    } else if (currentApp?.isIntegratedWithPix) {
      setPaymentMethodType(PaymentMethodType.Pix);
    }
  }, [currentApp]);

  useEffect(() => {
    setIsDisabledCreatePixAccount(
      paymentMethodType !== PaymentMethodType.Pix ||
        !!currentAccount?.pagarmeCustomer
    );
  }, [currentAccount?.pagarmeCustomer, paymentMethodType]);

  useEffect(() => {
    let priceSelected = product?.defaultPrice;
    if (priceURLParamId) {
      priceSelected = product?.prices?.items?.find(
        (currentPriceItem) => priceURLParamId === currentPriceItem?.id
      );
      if (!priceSelected) {
        priceSelected = product?.defaultPrice;
      }
    }
    if (priceSelected) {
      setCurrentPrice(priceSelected || undefined);
    }
  }, [priceURLParamId, product]);

  const onChoosePrice = useCallback(
    (priceId: string) => {
      const price = product?.prices?.items?.find(
        (productPrice) => productPrice?.id === priceId
      );
      setCurrentPrice(price || null);
    },
    [product]
  );

  const goToSummary = useCallback(() => {
    return setCurrentStep(CheckoutStep.SUMMARY);
  }, []);

  const goToSummaryOrCreatePixAccount = useCallback(() => {
    if (paymentMethodType === PaymentMethodType.Pix) {
      if (!currentAccount?.pagarmeCustomer) {
        return setCurrentStep(CheckoutStep.CREATE_PIX_ACCOUNT);
      }
    }
    return goToSummary();
  }, [currentAccount?.pagarmeCustomer, goToSummary, paymentMethodType]);

  const onCreateOrder = useCallback(async () => {
    if (!currentAccount) {
      router.push({
        pathname: routes.auth.login,
        query: { redirectTo: router.asPath },
      });
      return;
    }
    try {
      const response = await onExecuteOrder({
        input: {
          items: [
            {
              price: currentPrice?.id || "",
            },
          ],
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
    currentPrice?.id,
    onExecuteOrder,
    onShowAPIError,
    router,
    translate,
  ]);

  const onCreatePayment = useCallback(
    async (order: string) => {
      try {
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
    <CheckoutLayout isLoading={isLoadingProduct}>
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
                title={translate.formatMessage({ id: "subscription" })}
                stepIndex={CheckoutStep.SUBSCRIPTION}
              />
              <StepItem
                title={translate.formatMessage({ id: "paymentMethod" })}
                stepIndex={CheckoutStep.PAYMENT_METHOD}
                isDisabled={!currentPrice}
              />
              {!isDisabledCreatePixAccount && (
                <StepItem
                  title={translate.formatMessage({ id: "account" })}
                  stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}
                  isDisabled={!currentPrice && !paymentMethodType}
                />
              )}
              <StepItem
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={CheckoutStep.SUMMARY}
                isDisabled={!currentPrice && !paymentMethodType}
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
                  <StepPanel stepIndex={CheckoutStep.SUBSCRIPTION}>
                    <SubscriptionStep
                      prices={product?.prices?.items || []}
                      product={product}
                      currentPrice={currentPrice}
                      onChoosePrice={onChoosePrice}
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
                        setCurrentStep(CheckoutStep.SUBSCRIPTION)
                      }
                      onNextStep={goToSummaryOrCreatePixAccount}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}>
                    <CreatePixAccountStep
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.SUBSCRIPTION)
                      }
                      onNextStep={() => {
                        setIsDisabledCreatePixAccount(true);
                        goToSummary();
                      }}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.SUMMARY}>
                    <SummaryStep
                      price={currentPrice}
                      product={product}
                      paymentMethodType={paymentMethodType}
                      isLoadingCheckout={isLoadingCheckout || isLoadingOrder}
                      onGoToSubscription={() =>
                        setCurrentStep(CheckoutStep.SUBSCRIPTION)
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
                      price={currentPrice}
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
