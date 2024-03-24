import { useTranslations } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import {
  Card,
  CardBody,
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Title,
} from "@stokei/ui";

import { Navbar } from "../../components/navbar";

export const IntegratedCallbackPage = () => {
  const translate = useTranslations();
  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5" justify="center" align="center">
        <Card width={["full", "full", "50%", "50%"]} background="background.50">
          <CardBody>
            <Stack
              direction="column"
              spacing="5"
              justify="center"
              align="center"
            >
              <Icon name="check" fontSize="4xl" color="success.500" />
              <Title textAlign="center" fontSize="lg">
                {translate.formatMessage({ id: "successfullyIntegrated" })}
              </Title>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </AppLayout>
  );
};
