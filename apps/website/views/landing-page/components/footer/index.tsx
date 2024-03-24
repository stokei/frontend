import { AppLogo } from "@/components";
import {
  DEFAULT_APP_CNPJ,
  DEFAULT_APP_NAME,
  DEFAULT_APP_SOCIAL_NAME,
} from "@/constants/default-app-info";
import { STOKEI_CONTACT_EMAIL } from "@/constants/stokei-emails";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Button,
  ButtonGroup,
  Container,
  Footer as FooterUI,
  Stack,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();
  const translate = useTranslations();
  return (
    <FooterUI paddingY="10">
      <Stack
        direction={["column", "column", "row", "row"]}
        justify="space-between"
        spacing="5"
      >
        <Stack direction="column" spacing="5">
          <AppLogo />
          <Stack direction="column" spacing="0">
            <Text>{DEFAULT_APP_SOCIAL_NAME}</Text>
            <Text>{DEFAULT_APP_CNPJ}</Text>
            <Text>{STOKEI_CONTACT_EMAIL}</Text>
          </Stack>
          <Text>
            {translate.formatMessage(
              { id: "allRightsReserved" },
              { year: "2023", company: DEFAULT_APP_NAME }
            )}
          </Text>
        </Stack>
        <ButtonGroup>
          <Button
            variant="ghost"
            onClick={() => router.push(routes.auth.login)}
          >
            {translate.formatMessage({ id: "login" })}
          </Button>
          <Button onClick={() => router.push(routes.auth.signUp)}>
            {translate.formatMessage({ id: "signUp" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </FooterUI>
  );
};
