import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Stack,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";

interface AlertsProps {}

export const Alerts: FC<AlertsProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const hasIntegrations = useMemo(
    () => !currentApp?.isIntegratedWithStripe && !currentApp?.isStokei,
    [currentApp]
  );

  const goToStripeOnboarding = useCallback(
    () => router.push(routes.app({ appId: currentApp?.id }).onboardings.home),
    [currentApp?.id, router]
  );

  if (!hasIntegrations) {
    return <></>;
  }

  return (
    <Container>
      <Stack direction="column" spacing="5">
        <Alert status="warning">
          <AlertIcon />
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="5"
            justify={["center", "center", "space-between", "space-between"]}
            align={["space-between", "space-between", "center", "center"]}
          >
            <Box flexDirection="column">
              <AlertDescription>
                {translate.formatMessage({
                  id: "youDontHaveAnyPaymentGatewayYet",
                })}
              </AlertDescription>
            </Box>
            <Box>
              <Button
                variant="ghost"
                colorScheme="black"
                onClick={goToStripeOnboarding}
              >
                {translate.formatMessage({
                  id: "clickHereToConfigure",
                })}
              </Button>
            </Box>
          </Stack>
        </Alert>
      </Stack>
    </Container>
  );
};
