import { useAPIErrors, useCurrentApp } from "@/hooks";
import { PaymentGatewayType } from "@/services/graphql/stokei";
import { websiteRoutes } from "@stokei/routes";
import { useCallback } from "react";
import { useCreateAppPaymentOnboardingLinkMutation } from "../../graphql/create-app-payment-oboarding.mutation.graphql.generated";

export const useCreateAppPaymentOnboarding = () => {
  const { currentApp } = useCurrentApp();
  const { onShowAPIError } = useAPIErrors();
  const [
    { fetching: isLoadingCreateAppPaymentOnboarding },
    onCreateAppPaymentOnboarding,
  ] = useCreateAppPaymentOnboardingLinkMutation();

  const onCreateAppPaymentOnboardingAndGoToLink = useCallback(
    async ({ paymentGatewayType }: { paymentGatewayType: PaymentGatewayType }) => {
      try {
        const response = await onCreateAppPaymentOnboarding({
          input: {
            paymentGatewayType,
            cancelURL: new URL(websiteRoutes.app({ appId: currentApp?.id }).onboardings.home, window.location.origin).toString(),
            successURL: new URL(websiteRoutes.app({ appId: currentApp?.id }).onboardings.callback(paymentGatewayType?.toLowerCase()), window.location.origin).toString(),
          }
        });

        if (!!response?.data?.createAppPaymentOnboardingLink) {
          return window.open(response?.data?.createAppPaymentOnboardingLink?.url, '_blank');
        }

        if (!!response.error?.graphQLErrors?.length) {
          response.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
        }
      } catch (error) { }
    },
    [currentApp?.id, onCreateAppPaymentOnboarding, onShowAPIError]
  );

  return {
    isLoadingCreateAppPaymentOnboarding,
    onCreateAppPaymentOnboardingAndGoToLink
  };
};
