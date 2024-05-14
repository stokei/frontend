import { useTranslations } from "@/hooks";
import { Badge, BadgeGroup, Card, CardBody, Hero, HeroContent, HeroMedia, HeroSubtitle, HeroTitle, Link, Stack } from "@stokei/ui";

export const CreateYourDomainHero = () => {
  const translate = useTranslations();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          {translate.formatMessage({ id: "chooseYourDomain" })}
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "customizeYourExperienceChooseFromStokeiSFreeDomainOrAddYourOwnCustomDomain",
          })}
        </HeroSubtitle>
      </HeroContent>
      <HeroMedia>
        <Stack direction="column" spacing="5">
          <Card
            background="background.50"
          >
            <CardBody>
              <Stack
                direction="row"
                spacing="5"
              >
                <Stack direction="column" spacing="2">
                  <Link
                    width="fit-content"
                    href=""
                    fontWeight="bold"
                    target="_blank"
                    onClick={e => e.preventDefault()}
                    cursor="default"
                  >
                    mysite.stokei.app
                  </Link>

                  <BadgeGroup direction="row">
                    <Badge colorScheme="green">
                      {translate.formatMessage({
                        id: "active",
                      })}
                    </Badge>
                    <Badge colorScheme="yellow">
                      {translate.formatMessage({
                        id: "free",
                      })}
                    </Badge>
                    <Badge colorScheme="gray">
                      {translate.formatMessage({
                        id: "default",
                      })}
                    </Badge>
                  </BadgeGroup>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
          <Card
            background="background.50"
          >
            <CardBody>
              <Stack
                direction="row"
                spacing="5"
              >
                <Stack direction="column" spacing="2">
                  <Link
                    width="fit-content"
                    href=""
                    fontWeight="bold"
                    target="_blank"
                    onClick={e => e.preventDefault()}
                    cursor="default"
                  >
                    mysite.com.br
                  </Link>

                  <BadgeGroup direction="row">
                    <Badge colorScheme="green">
                      {translate.formatMessage({
                        id: "active",
                      })}
                    </Badge>
                  </BadgeGroup>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </HeroMedia>
    </Hero>
  );
};
