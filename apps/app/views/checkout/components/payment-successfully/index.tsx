import { useTranslations } from "@/hooks";
import { Icon, Stack, Text } from "@stokei/ui";
import { FC } from "react";

interface PaymentSuccessfullyProps {}

export const PaymentSuccessfully: FC<PaymentSuccessfullyProps> = () => {
  const translate = useTranslations();
  return (
    <Stack direction="column" align="center" justify="center" spacing="1">
      <Icon fontSize="6xl" color="success.500" name="check" />
      <Text fontSize="lg" fontWeight="semibold">
        {translate.formatMessage({ id: "paymentSucceeded" })}
      </Text>
    </Stack>
  );
};
