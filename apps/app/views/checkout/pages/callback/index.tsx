import { useShoppingCart } from "@/hooks";
import { Box, Card, CardBody, Container } from "@stokei/ui";
import { FC, useEffect } from "react";
import { PaymentSuccessfully } from "../../components/payment-successfully";
import { CheckoutLayout } from "../../layout";

interface CheckoutCallbackPageProps {}

export const CheckoutCallbackPage: FC<CheckoutCallbackPageProps> = () => {
  const { onClearShoppingCart } = useShoppingCart();

  useEffect(() => {
    onClearShoppingCart();
  }, [onClearShoppingCart]);

  return (
    <CheckoutLayout>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "584px", "584px"]}
          height="fit-content"
          flexDirection="column"
        >
          <Card background="background.50">
            <CardBody>
              <PaymentSuccessfully />
            </CardBody>
          </Card>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
