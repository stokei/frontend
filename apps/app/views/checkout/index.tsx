import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { CheckoutStep } from "@/constants/checkout-steps";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { useTranslations } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  Container,
  Image,
  Stack,
  StepItem,
  StepList,
  StepPanel,
  StepPanels,
  Steps,
  Title,
} from "@stokei/ui";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useMemo, useState } from "react";
import { CheckoutPayment } from "./components/checkout-payment";
import { CheckoutSummary } from "./components/checkout-summary";
import { CheckoutResult } from "./components/checkout-result";
import { SubscriptionForm } from "./components/subscription-form";
import { useGetCheckoutProductQuery } from "./graphql/product.query.graphql.generated";
import { CheckoutLayout } from "./layout";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";

const stripeLoadElements = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface CheckoutPageProps {
  readonly productId: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({ productId }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.SUBSCRIPTION
  );
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const translate = useTranslations();

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);
  const paymentIsEnabled = useMemo(() => !!currentPrice, [currentPrice]);
  const summaryIsEnabled = useMemo(() => !!product, [product]);
  const resultIsEnabled = useMemo(() => false, []);

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.defaultPrice || undefined);
    }
  }, [product]);

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
            <StepList marginBottom="5" justify="center" align="center">
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
              <Card background="background.50">
                <CardBody>
                  <StepPanel stepIndex={CheckoutStep.SUBSCRIPTION}>
                    <SubscriptionForm
                      avatarURL={product?.avatar?.file?.url || ""}
                      productName={product?.name}
                      prices={product?.prices?.items || []}
                      currentPrice={currentPrice}
                      onChoosePrice={setCurrentPrice}
                      onNextStep={() => setCurrentStep(CheckoutStep.PAYMENT)}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.PAYMENT}>
                    <Elements
                      stripe={stripeLoadElements}
                      options={{
                        appearance: {
                          theme: "stripe",
                        },
                        locale: translate.locale as any,
                      }}
                    >
                      <CheckoutPayment
                        price={currentPrice}
                        onPreviousStep={() =>
                          setCurrentStep(CheckoutStep.SUBSCRIPTION)
                        }
                      />
                    </Elements>
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.SUMMARY}>
                    <CheckoutSummary
                      productId={product?.id}
                      productName={product?.name}
                      avatarURL={product?.avatar?.file?.url || ""}
                      price={currentPrice}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={CheckoutStep.RESULT}>
                    <CheckoutResult />
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
