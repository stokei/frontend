import pagarmeImage from "@/assets/pagarme.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const PagarmeOnboarding = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const router = useRouter();

  const isIntegratedWithPagarme = useMemo(
    () => !!currentApp?.isIntegratedWithPagarme,
    [currentApp]
  );

  const goToPagarmeOnboarding = () => {
    router.push(
      routes.app({ appId: currentApp?.id || "" }).onboardings.pagarme.home
    );
  };

  return (
    <Card background="background.50">
      <CardBody>
        <Stack height="full" direction="column" spacing="5">
          <Image
            width="24"
            src={pagarmeImage.src}
            fallbackSrc={pagarmeImage.blurDataURL}
            alt={translate.formatMessage({ id: "pagarmeOnboarding" })}
          />
          <Box flexDirection="column" flex="auto">
            <Text>
              {translate.formatMessage({
                id: "integrateThePagarmePaymentMethodIntoYourPlatform",
              })}
            </Text>
          </Box>
          <ButtonGroup>
            <Button
              onClick={
                !isIntegratedWithPagarme ? goToPagarmeOnboarding : undefined
              }
              isDisabled={isIntegratedWithPagarme}
            >
              {translate.formatMessage({
                id: isIntegratedWithPagarme ? "added" : "add",
              })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
