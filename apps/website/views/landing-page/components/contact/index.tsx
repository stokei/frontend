import { STOKEI_CONTACT_EMAIL } from "@/constants/stokei-emails";
import { useTranslations } from "@/hooks";
import { Container, Stack, Text, Title } from "@stokei/ui";

export const Contact = () => {
  const translate = useTranslations();
  return (
    <Container paddingY="16">
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
