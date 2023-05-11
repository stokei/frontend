import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Box, Button, Icon, Stack, Text } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";

interface PaymentSuccessfullyProps {}

export const PaymentSuccessfully: FC<PaymentSuccessfullyProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { homePageURL } = useCurrentAccount();
  return (
    <Stack direction="column" align="center" justify="center" spacing="1">
      <Icon fontSize="6xl" color="success.500" name="check" />
      <Text fontSize="lg" fontWeight="semibold">
        {translate.formatMessage({ id: "paymentSucceeded" })}
      </Text>

      <Box paddingTop="5">
        <Button onClick={() => router.push(homePageURL || "")}>
          {translate.formatMessage({ id: "home" })}
        </Button>
      </Box>
    </Stack>
  );
};
