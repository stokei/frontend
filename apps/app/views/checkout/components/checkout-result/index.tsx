import { Stack } from "@stokei/ui";
import { FC } from "react";
import { PaymentSuccessfully } from "../payment-successfully";

interface CheckoutResultProps {
  readonly paymentSuccessfully?: boolean;
}

export const CheckoutResult: FC<CheckoutResultProps> = ({
  paymentSuccessfully,
  ...props
}) => {
  return (
    <Stack direction="column" spacing="5">
      {paymentSuccessfully ? <PaymentSuccessfully /> : <></>}
    </Stack>
  );
};
