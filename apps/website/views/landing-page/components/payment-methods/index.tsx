import { useTranslations } from "@/hooks";
import {
  Container,
  Highlight,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { PlanItemPaymentWithBoleto } from "../plan-item-payment-with-boleto";
import { PlanItemPaymentWithCard } from "../plan-item-payment-with-card";
import { PlanItemPaymentWithPix } from "../plan-item-payment-with-pix";
import { PlanItemPaymentWithStripe } from "../plan-item-payment-with-stripe";

export const PaymentMethods = () => {
  const translate = useTranslations();
  return (
    <Container width="full" paddingY="6" minH="100vh">
      <Stack spacing={4} direction="column" align="center" justify="center">
        <Stack
          p={5}
          alignItems="center"
          justify="center"
          align="center"
        >
          <Title textAlign="center">
            {translate.formatMessage({
              id: "paymentMethods",
            })}
          </Title>
        </Stack>
        <SimpleGrid maxWidth="900px" columns={[1, 1, 2, 2]} spacing="5">
          <PlanItemPaymentWithCard />
          <PlanItemPaymentWithBoleto />
          <PlanItemPaymentWithPix />
          <PlanItemPaymentWithStripe />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
