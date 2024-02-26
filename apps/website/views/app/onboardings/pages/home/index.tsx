import { AppLayout } from "@/views/app/layout";
import { Container, SimpleGrid, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "../../components/navbar";
import { PagarmeOnboarding } from "../../components/pagarme-onboarding";
import { useTranslations } from "@/hooks";
import { StripeOnboarding } from "../../components/stripe-onboarding";

interface OnboardingsPageProps {}

export const OnboardingsPage: FC<OnboardingsPageProps> = () => {
  const translate = useTranslations();
  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <Title fontSize="lg" marginBottom="5">
            {translate.formatMessage({ id: "paymentMethods" })}
          </Title>
          <SimpleGrid columns={[1, 1, 2, 2]} spacing="5">
            <PagarmeOnboarding />
            <StripeOnboarding />
          </SimpleGrid>
        </Container>
      </Stack>
    </AppLayout>
  );
};
