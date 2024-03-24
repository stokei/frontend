import stripeImage from "@/assets/stripe.png";
import { STRIPE_URL } from "@/constants/stripe-links";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Link,
  Stack,
  Text,
} from "@stokei/ui";
import { useCallback, useMemo } from "react";
import { useCreateAppStripeOnboardingMutation } from "../../graphql/create-app-stripe-oboarding.mutation.graphql.generated";

export const StripeOnboarding = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowAPIError } = useAPIErrors();

  const isIntegratedWithStripe = useMemo(
    () => !!currentApp?.isIntegratedWithStripe,
    [currentApp]
  );

  const [
    { fetching: isLoadingCreateAppStripeOnboarding },
    onCreateAppStripeOnboarding,
  ] = useCreateAppStripeOnboardingMutation();

  const goToStripeOnboarding = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        const response = await onCreateAppStripeOnboarding({});

        if (!!response?.data?.createAppStripeOnboarding) {
          window.location.assign(
            response?.data?.createAppStripeOnboarding?.url
          );
        }

        if (!!response.error?.graphQLErrors?.length) {
          response.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
        }
      } catch (error) {}
    },
    [onCreateAppStripeOnboarding, onShowAPIError]
  );

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Link href={STRIPE_URL} target="_blank">
            <Image
              width="24"
              src={stripeImage.src}
              fallbackSrc={stripeImage.blurDataURL}
              alt={translate.formatMessage({ id: "paymentMethod" })}
            />
          </Link>

          <Text>
            {translate.formatMessage({
              id: "integrateYourBusinessWithStripesPaymentsPlatform",
            })}
          </Text>

          <ButtonGroup>
            <Button
              isLoading={isLoadingCreateAppStripeOnboarding}
              onClick={goToStripeOnboarding}
              variant={isIntegratedWithStripe ? "outline" : undefined}
            >
              {translate.formatMessage({
                id: isIntegratedWithStripe ? "update" : "add",
              })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
