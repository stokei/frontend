import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { PaymentSuccessfully } from "../payment-successfully";

interface CheckoutResultProps {}

export const CheckoutResult: FC<CheckoutResultProps> = ({ ...props }) => {
  const [paymentSuccessfully, setPaymentSuccessfully] = useState(false);

  const translate = useTranslations();
  const { homePageURL } = useCurrentAccount();
  const router = useRouter();

  return (
    <Stack direction="column" spacing="5">
      {paymentSuccessfully ? <PaymentSuccessfully /> : <></>}
    </Stack>
  );
};
