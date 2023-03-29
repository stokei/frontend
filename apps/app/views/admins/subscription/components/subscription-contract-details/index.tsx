import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useTranslations } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  Label,
  Navbar as NavbarUI,
  Stack,
  Title,
} from "@stokei/ui";
import { FC } from "react";

interface SubscriptionContractDetailsProps {}

export const SubscriptionContractDetails: FC<
  SubscriptionContractDetailsProps
> = () => {
  const translate = useTranslations();
  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        <Stack direction="column" spacing="5">
          <Box flexDirection="column">
            <Label>
              {translate.formatMessage({ id: "subscriptionDetails" })}
            </Label>
          </Box>
        </Stack>
        <Title fontSize="lg" lineHeight="shorter">
          {translate.formatMessage({ id: "subscriptionDetails" })}
        </Title>
      </CardBody>
    </Card>
  );
};
