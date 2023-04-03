import { useTranslations } from "@/hooks";
import { AdminLayout } from "@/views/admins/layout";
import {
  Card,
  CardBody,
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Title,
} from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "../../components/navbar";

interface IntegratedCallbackPageProps {}

export const IntegratedCallbackPage: FC<IntegratedCallbackPageProps> = () => {
  const translate = useTranslations();
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};
