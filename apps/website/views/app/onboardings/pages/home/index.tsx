import { AppLayout } from "@/views/app/layout";
import { Container, SimpleGrid, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "../../components/navbar";
import { StripeOnboarding } from "../../components/stripe-onboarding";
import { PixOnboarding } from "../../components/pix-onboarding";
import { useTranslations } from "@/hooks";

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
            <StripeOnboarding />
            <PixOnboarding />
          </SimpleGrid>
        </Container>
      </Stack>
    </AppLayout>
  );
};
