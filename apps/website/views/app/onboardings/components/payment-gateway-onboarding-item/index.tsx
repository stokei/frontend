import { useCurrentApp, useTranslations } from "@/hooks";
import { usePlugins } from "@/hooks/use-plugins";
import { PaymentGatewayType, PluginType } from "@/services/graphql/stokei";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Icon,
  Label,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from "@stokei/ui";
import { PropsWithChildren, useMemo } from "react";
import { useCreateAppPaymentOnboarding } from "../../hooks/use-create-app-payment-onboarding";
import { paymentGatewayFees } from "@/constants/payment-gateway-fees";

interface PaymentGatewayOnboardingItemProps {
  paymentGatewayType: PaymentGatewayType;
  gatewayExternalURL: string;
}

export const PaymentGatewayOnboardingItem = ({ paymentGatewayType, gatewayExternalURL, children }: PropsWithChildren<PaymentGatewayOnboardingItemProps>) => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { isLoadingCreateAppPaymentOnboarding, onCreateAppPaymentOnboardingAndGoToLink } = useCreateAppPaymentOnboarding();
  const { isLoading, getPluginByType } = usePlugins();
  const paymentGateway = paymentGatewayFees[paymentGatewayType];
  const feePercentage = paymentGateway?.percentage ? paymentGateway?.percentage + '%' : '';
  const feeFixAmount = paymentGateway?.fixAmount ? ` + ${translate.formatMoney({
    showSymbol: true,
    amount: paymentGateway?.fixAmount,
    currency: currentApp?.currency?.id || "",
    minorUnit: currentApp?.currency?.minorUnit,
  })}` : '';

  const isIntegrated = useMemo(
    () => !!getPluginByType(paymentGatewayType as unknown as PluginType),
    [getPluginByType, paymentGatewayType]
  );

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          {children}
          <Stack direction="column" spacing="0">
            <Label>{translate.formatMessage({ id: 'fee' })}</Label>
            <Text>
              {`+ ${feePercentage}${feeFixAmount} ${translate.formatMessage({ id: "eachSale" })}`}
            </Text>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup width="full" alignItems="center" justifyContent="space-between">
          <Link
            href={gatewayExternalURL}
            target="_blank"
          >
            {translate.formatMessage({
              id: "visit"
            })}
          </Link>
          <Button
            isLoading={isLoadingCreateAppPaymentOnboarding || isLoading}
            onClick={() => onCreateAppPaymentOnboardingAndGoToLink({
              paymentGatewayType
            })}
            variant={isIntegrated ? "outline" : undefined}
            isDisabled={isIntegrated}
          >
            {translate.formatMessage({
              id: isIntegrated ? "update" : "add",
            })}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
