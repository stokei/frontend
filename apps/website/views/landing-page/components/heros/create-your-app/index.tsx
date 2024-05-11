import { DEFAULT_APP_NAME } from "@/constants/default-app-info";
import { useTranslations } from "@/hooks";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Hero,
  HeroContent,
  HeroMedia,
  HeroSubtitle,
  HeroTitle,
  Stack,
  Title
} from "@stokei/ui";

export const CreateYourAppHero = () => {
  const translate = useTranslations();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          {translate.formatMessage({ id: "createYourApp" })}
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "anApplicationIsYourControlCenterForManagingProducts",
          })}
        </HeroSubtitle>
      </HeroContent>
      <HeroMedia>
        <Card
          background="background.50"
          overflow="hidden"
        >
          <CardBody>
            <Stack direction="row" spacing="5" align="center">
              <Avatar size="lg" name={DEFAULT_APP_NAME} />
              <Stack direction="column" spacing="1">
                <Title size="sm">{DEFAULT_APP_NAME}</Title>
                <Box>
                  <Badge
                    size="sm"
                    colorScheme="green"
                    variant="subtle"
                  >
                    {translate.formatMessage({ id: 'active' })}
                  </Badge>
                </Box>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </HeroMedia>
    </Hero>
  );
};
