import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { CheckoutStep } from "@/constants/checkout-steps";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Image,
  RadioCard,
  RadioGroup,
  Stack,
  StepItem,
  StepList,
  StepPanel,
  StepPanels,
  Steps,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useCreateCheckoutMutation } from "../../graphql/create-checkout.mutation.graphql.generated";
import { useGetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";
import { CheckoutLayout } from "../../layout";
import { CreatePixAccountStep } from "./steps/create-pix-account";
import { PaymentMethodStep } from "./steps/payment-method";
import { SubscriptionStep } from "./steps/subscription";

interface CheckoutPageProps {
  readonly productId: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({ productId }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAreaCode, setPhoneAreaCode] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("55");
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const translate = useTranslations();
  const router = useRouter();
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

  const onBuy = useCallback(async () => {
    try {
      if (!currentAccount) {
        router.push({
          pathname: routes.auth.login,
          query: { redirectTo: router.asPath },
        });
        return;
      }
      const response = await onExecuteCheckout({
        input: {
          price: currentPrice?.id || "",
        },
      });

      if (!!response?.data?.createCheckout) {
        router.push(response.data.createCheckout.url || "");
        return;
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
    onExecuteCheckout,
    onShowAPIError,
    router,
    translate,
  ]);

  const onChoosePrice = useCallback(
    (priceId: string) => {
      const price = product?.prices?.items?.find(
        (productPrice) => productPrice?.id === priceId
      );
      setCurrentPrice(price || null);
    },
    [product]
  );

  const goToPayment = useCallback(() => {
    if (paymentMethodType === PaymentMethodType.Pix) {
      if (currentAccount?.pagarmeCustomer) {
        return setCurrentStep(CheckoutStep.PAYMENT);
      }
      return setCurrentStep(CheckoutStep.CREATE_PIX_ACCOUNT);
    }
    return onBuy();
  }, [currentAccount?.pagarmeCustomer, onBuy, paymentMethodType]);

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
              {!currentAccount?.pagarmeCustomer && (
                <StepItem
                  title={translate.formatMessage({ id: "account" })}
                  stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}
                  isDisabled={!currentPrice && !paymentMethodType}
                />
              )}
              <StepItem
                title={translate.formatMessage({ id: "payment" })}
                stepIndex={CheckoutStep.PAYMENT}
                isDisabled={!currentPrice && !paymentMethodType}
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
                      onNextStep={goToPayment}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.CREATE_PIX_ACCOUNT}>
                    <CreatePixAccountStep
                      phoneNumber={phoneNumber}
                      phoneAreaCode={phoneAreaCode}
                      phoneCountryCode={phoneCountryCode}
                      onChangeNumber={setPhoneNumber}
                      onChangeAreaCode={setPhoneAreaCode}
                      onChangeCountryCode={setPhoneCountryCode}
                      onPreviousStep={() =>
                        setCurrentStep(CheckoutStep.SUBSCRIPTION)
                      }
                      onNextStep={goToPayment}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT}></StepPanel>
                </CardBody>
              </Card>
            </StepPanels>
          </Steps>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
