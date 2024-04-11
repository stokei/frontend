import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { Badge, Button, Card, CardBody, Stack, Text, Title } from "@stokei/ui";

import { websiteRoutes } from "@stokei/routes";
import { useRouter } from "next/router";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";

export interface PageItemProps {
  readonly page: SitePagesPageFragment;
}

export const PageItem = ({ page }: PageItemProps) => {
  const router = useRouter();
  const { site } = useSite();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  const onGoToEditPage = async () => {
    const editPageURL = websiteRoutes
      .app({ appId: currentApp?.id })
      .site({ site: site?.id || "" })
      .page({ page: page?.id, version: page?.version?.id }).home;
    router.push(editPageURL);
  };
  return (
    <Card>
      <CardBody>
        <Stack
          align={["flex-start", "flex-start", "center", "center"]}
          justify={[
            "flex-start",
            "flex-start",
            "space-between",
            "space-between",
          ]}
          direction={["column", "column", "row", "row"]}
          spacing="2"
        >
          <Stack direction="column" spacing="1">
            <Title fontSize="medium">{page?.title}</Title>
            <Text fontSize="x-small">
              {translate.formatMessage({ id: "version" })}:{" "}
              {page?.version?.name}
            </Text>
          </Stack>
          {page?.id === site?.homePage?.id ? (
            <Badge>{translate.formatMessage({ id: "home" })}</Badge>
          ) : undefined}
          <Button onClick={onGoToEditPage} variant="ghost">
            {translate.formatMessage({ id: "edit" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
