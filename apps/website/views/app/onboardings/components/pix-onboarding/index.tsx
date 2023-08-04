import pixImage from "@/assets/pix.png";
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
import { FC, useMemo } from "react";

interface PixOnboardingProps {}

export const PixOnboarding: FC<PixOnboardingProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const router = useRouter();

  const isIntegratedWithPix = useMemo(
    () => !!currentApp?.isIntegratedWithPix,
    [currentApp]
  );

  const goToPixOnboarding = () => {
    router.push(
      routes.app({ appId: currentApp?.id || "" }).onboardings.pix.home
    );
  };

  return (
    <Card background="background.50">
      <CardBody>
        <Stack height="full" direction="column" spacing="5">
          <Image
            width="24"
            src={pixImage.src}
            fallbackSrc={pixImage.blurDataURL}
            alt={translate.formatMessage({ id: "pixOnboarding" })}
          />
          <Box flexDirection="column" flex="auto">
            <Text>
              {translate.formatMessage({
                id: "integrateThePixPaymentMethodIntoYourPlatform",
              })}
            </Text>
          </Box>
          <ButtonGroup>
            <Button
              onClick={!isIntegratedWithPix ? goToPixOnboarding : undefined}
              isDisabled={isIntegratedWithPix}
            >
              {translate.formatMessage({
                id: isIntegratedWithPix ? "added" : "add",
              })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
