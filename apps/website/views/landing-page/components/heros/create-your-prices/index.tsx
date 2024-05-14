import { useCurrentApp, useTranslations } from "@/hooks";
import { IntervalType, PriceType } from "@/services/graphql/stokei";
import { Price } from "@stokei/builder";
import { Badge, BadgeGroup, Card, CardBody, CardFooter, CardHeader, Hero, HeroContent, HeroMedia, HeroSubtitle, HeroTitle, Stack, Text } from "@stokei/ui";

export const CreateYourPricesHero = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          {translate.formatMessage({ id: "createYourPrices" })}
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "setPricesThatMeetYourCustomersNeeds",
          })}
        </HeroSubtitle>
      </HeroContent>
      <HeroMedia>
        <Stack direction="column" spacing="5">
          <Card>
            <CardHeader paddingBottom={0}>
              <Stack direction="row" spacing="5" justify="space-between">
                <Text fontSize="md" lineHeight="shorter" fontWeight="600">
                  {translate.formatMessage({ id: 'plan' })} {translate.formatMessage({ id: 'monthly' })}
                </Text>
              </Stack>
            </CardHeader>
            <CardBody paddingBottom={0}>
              {currentApp?.currency && (
                <Price
                  withUnitDescription
                  price={{
                    id: '1',
                    isDefault: true,
                    parent: "",
                    amount: 9999,
                    type: PriceType.Recurring,
                    active: true,
                    currency: currentApp?.currency,
                    recurring: {
                      interval: IntervalType.Month,
                      intervalCount: 1,
                    }
                  }}
                />
              )}
            </CardBody>
            <CardFooter>
              <BadgeGroup direction="row">
                <Badge colorScheme="green">
                  {translate.formatMessage({
                    id: "active",
                  })}
                </Badge>
                <Badge colorScheme="gray">
                  {translate.formatMessage({
                    id: "default",
                  })}
                </Badge>
              </BadgeGroup>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader paddingBottom={0}>
              <Stack direction="row" spacing="5" justify="space-between">
                <Text fontSize="md" lineHeight="shorter" fontWeight="600">
                  {translate.formatMessage({ id: 'plan' })} {translate.formatMessage({ id: 'lifelong' })}
                </Text>
              </Stack>
            </CardHeader>
            <CardBody paddingBottom={0}>
              {currentApp?.currency && (
                <Price
                  withUnitDescription
                  price={{
                    id: '1',
                    isDefault: false,
                    parent: "",
                    amount: 124559,
                    type: PriceType.OneTime,
                    active: true,
                    currency: currentApp?.currency,
                  }}
                />
              )}
            </CardBody>
            <CardFooter>
              <BadgeGroup direction="row">
                <Badge colorScheme="green">
                  {translate.formatMessage({
                    id: "active",
                  })}
                </Badge>
                <Badge colorScheme="purple">
                  {translate.formatMessage({
                    id: "lifelong",
                  })}
                </Badge>
              </BadgeGroup>
            </CardFooter>
          </Card>
        </Stack>
      </HeroMedia>
    </Hero>
  );
};
