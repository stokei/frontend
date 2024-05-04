import { useTranslations } from "@/hooks";
import {
  Container,
  Highlight,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { PlanCalculator } from "../plan-calculator";
import { PlanFree } from "../plan-free";
import { PlanItemPaymentWithBoleto } from "../plan-item-payment-with-boleto";
import { PlanItemPaymentWithCard } from "../plan-item-payment-with-card";
import { PlanItemPaymentWithPix } from "../plan-item-payment-with-pix";
import { PlanItemPaymentWithStripe } from "../plan-item-payment-with-stripe";

export const Plans = () => {
  const translate = useTranslations();
  return (
    <Container width="full" paddingY="6" minH="100vh">
      <Stack spacing={4} direction="column" align="center" justify="center">
        <Stack
          p={5}
          alignItems="center"
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            justify="center"
            align="center"
          >
            <Title textAlign="center">
              <Highlight
                query={translate.formatMessage({
                  id: "payOnlyForWhatYouUseHighlight",
                })}
              >
                {translate.formatMessage({
                  id: "payOnlyForWhatYouUse",
                })}
              </Highlight>
            </Title>
            <Text textAlign="center">
              {translate.formatMessage({
                id: "withOurPlansYouOnlyPayForWhatYouUse",
              })}
            </Text>
          </Stack>
        </Stack>
        <SimpleGrid maxWidth="900px" columns={[1, 1, 2, 2]} spacing="5">
          <PlanFree />
          <PlanCalculator />
          <PlanItemPaymentWithCard />
          <PlanItemPaymentWithBoleto />
          <PlanItemPaymentWithPix />
          <PlanItemPaymentWithStripe />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
