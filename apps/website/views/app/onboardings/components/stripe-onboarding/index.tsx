import stripeImage from "@/assets/stripe.png";
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
import { FC, useCallback, useMemo } from "react";
import { useCreateAppStripeOnboardingMutation } from "../../graphql/create-app-stripe-oboarding.mutation.graphql.generated";

interface StripeOnboardingProps {}

export const StripeOnboarding: FC<StripeOnboardingProps> = () => {
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
          <Link href="https://stripe.com/" target="_blank">
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
            {isIntegratedWithStripe ? (
              <Button
                isLoading={isLoadingCreateAppStripeOnboarding}
                onClick={goToStripeOnboarding}
                variant="outline"
              >
                {translate.formatMessage({
                  id: "update",
                })}
              </Button>
            ) : (
              <Button
                isLoading={isLoadingCreateAppStripeOnboarding}
                onClick={goToStripeOnboarding}
              >
                {translate.formatMessage({
                  id: "add",
                })}
              </Button>
            )}
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
