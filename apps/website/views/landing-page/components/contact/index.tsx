import { STOKEI_CONTACT_EMAIL } from "@/constants/stokei-emails";
import { useTranslations } from "@/hooks";
import { Container, Stack, Text, Title } from "@stokei/ui";
import { FC } from "react";

interface ContactProps {}

export const Contact: FC<ContactProps> = () => {
  const translate = useTranslations();
  return (
    <Container background="background.50" paddingY="16">
      <Stack direction="column" align="center" justify="center" spacing="8">
        <Title size="lg">
          {translate.formatMessage({ id: "doYouHaveALargeVolumeOfData" })}
        </Title>
        <Stack align="center" justify="center" spacing="1">
          <Text size="md">
            {translate.formatMessage({ id: "getInTouchWithUsViaEmail" })}
          </Text>
          <Text size="md" color="primary.500">
            {STOKEI_CONTACT_EMAIL}
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};
