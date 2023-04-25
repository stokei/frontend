import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { CheckoutStep } from "@/constants/checkout-steps";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { useTranslations } from "@/hooks";
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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { NextRouter, useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { CheckoutPayment } from "./components/checkout-payment";
import { CheckoutResult } from "./components/checkout-result";
import { CheckoutSummary } from "./components/checkout-summary";
import { SubscriptionForm } from "./components/subscription-form";
import { CheckoutPaymentMethodFragment } from "./graphql/payment-methods.query.graphql.generated";
import { useGetCheckoutProductQuery } from "./graphql/product.query.graphql.generated";
import { CheckoutLayout } from "./layout";
import { createAPIClient } from "@/services/graphql/client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";

const stripeLoadElementsWithApp = async (router: NextRouter) => {
  const { appId } = router.query || {};
  const stokeiClient = createAPIClient({
    appId: appId ? appId + "" : undefined,
  });
  let stripeAccount: string = "";
  try {
    const currentAppResponse = await stokeiClient.api
      .query<CurrentGlobalAppQuery>(CurrentGlobalAppDocument, {})
      .toPromise();

    if (!!currentAppResponse?.data?.currentApp) {
      stripeAccount = currentAppResponse?.data?.currentApp?.stripeAccount || "";
    }
  } catch (e) {}
  return loadStripe(
    STRIPE_PUBLISHABLE_KEY,
    stripeAccount
      ? {
          stripeAccount,
        }
      : {}
  );
};

interface CheckoutPageProps {
  readonly productId: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({ productId }) => {
  const [resultIsEnabled, setResultIsEnabled] = useState(false);
  const [paymentSuccessfully, setPaymentSuccessfully] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.SUBSCRIPTION
  );
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<
    CheckoutPaymentMethodFragment | undefined | null
  >();
  const translate = useTranslations();
  const router = useRouter();
  const { isAuthenticated } = useCurrentAccount();

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);
  const paymentIsEnabled = useMemo(() => !!currentPrice, [currentPrice]);
  const summaryIsEnabled = useMemo(
    () => !!product && !!paymentIsEnabled && !!currentPaymentMethod,
    [product, paymentIsEnabled, currentPaymentMethod]
  );

  const stripeLoadElements = useMemo(
    () => stripeLoadElementsWithApp(router),
    [router]
  );

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.defaultPrice || undefined);
    }
  }, [product]);

  const onPaymentSuccessfully = () => {
    setPaymentSuccessfully(true);
    setResultIsEnabled(true);
    setCurrentStep(CheckoutStep.RESULT);
  };

  const onSubscriptionFormNextStep = () => {
    if (!isAuthenticated) {
      const checkoutURL = routes.checkout.home({
        product: productId || "",
      });
      router.push({
        pathname: routes.auth.login,
        query: {
          redirectTo: checkoutURL,
        },
      });
      return;
    }
    setCurrentStep(CheckoutStep.PAYMENT);
  };

  return (
    <CheckoutLayout isLoading={isLoadingProduct}>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "584px", "584px"]}
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
                isDisabled={!paymentIsEnabled}
                title={translate.formatMessage({ id: "payment" })}
                stepIndex={CheckoutStep.PAYMENT}
              />
              <StepItem
                isDisabled={!summaryIsEnabled}
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={CheckoutStep.SUMMARY}
              />
              <StepItem
                isDisabled={!resultIsEnabled}
                title={translate.formatMessage({ id: "result" })}
                stepIndex={CheckoutStep.RESULT}
              />
            </StepList>
            <StepPanels>
              <Elements
                stripe={stripeLoadElements}
                options={{
                  appearance: {
                    theme: "stripe",
                  },
                  locale: translate.locale as any,
                }}
              >
                <Card background="background.50">
                  <CardBody>
                    <StepPanel stepIndex={CheckoutStep.SUBSCRIPTION}>
                      <SubscriptionForm
                        avatarURL={product?.avatar?.file?.url || ""}
                        productName={product?.name}
                        prices={product?.prices?.items || []}
                        currentPrice={currentPrice}
                        onChoosePrice={setCurrentPrice}
                        onNextStep={onSubscriptionFormNextStep}
                      />
                    </StepPanel>
                    <StepPanel stepIndex={CheckoutStep.PAYMENT}>
                      <CheckoutPayment
                        currentPrice={currentPrice}
                        currentPaymentMethod={currentPaymentMethod}
                        onChangeCurrentPaymentMethod={setCurrentPaymentMethod}
                        onPreviousStep={() =>
                          setCurrentStep(CheckoutStep.SUBSCRIPTION)
                        }
                        onNextStep={() => setCurrentStep(CheckoutStep.SUMMARY)}
                      />
                    </StepPanel>
                    <StepPanel stepIndex={CheckoutStep.SUMMARY}>
                      <CheckoutSummary
                        canBuy={summaryIsEnabled}
                        productId={product?.id}
                        productName={product?.name}
                        avatarURL={product?.avatar?.file?.url || ""}
                        currentPrice={currentPrice}
                        currentPaymentMethod={currentPaymentMethod}
                        onPreviousStep={() =>
                          setCurrentStep(CheckoutStep.PAYMENT)
                        }
                        onNextStep={onPaymentSuccessfully}
                      />
                    </StepPanel>
                    <StepPanel stepIndex={CheckoutStep.RESULT}>
                      <CheckoutResult
                        paymentSuccessfully={paymentSuccessfully}
                      />
                    </StepPanel>
                  </CardBody>
                </Card>
              </Elements>
            </StepPanels>
          </Steps>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
