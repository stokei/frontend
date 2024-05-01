import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { Badge, Button, Card, CardBody, Stack, Text, Title, useDisclosure } from "@stokei/ui";

import { websiteRoutes } from "@stokei/routes";
import { useRouter } from "next/router";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";
import { UpdatePageDrawer } from "../update-page-drawer";
import { PageType } from "@/services/graphql/stokei";

export interface PageItemProps {
  readonly page: SitePagesPageFragment;
}

export const PageItem = ({ page }: PageItemProps) => {
  const router = useRouter();
  const { site } = useSite();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const {
    isOpen: isOpenUpdatePageDrawer,
    onClose: onCloseUpdatePageDrawer,
    onOpen: onOpenUpdatePageDrawer,
  } = useDisclosure();

  const isHomePage = !!site?.homePage?.id && page?.id === site?.homePage?.id;
  const isLoginPage = !!site?.loginPage?.id && page?.id === site?.loginPage?.id;
  const isSignUpPage = !!site?.signUpPage?.id && page?.id === site?.signUpPage?.id;
  const existsDefaultPage = isHomePage || isLoginPage || isSignUpPage

  const onUpdatePageOrGoToEditPage = async () => {
    if (page?.type === PageType.External) {
      return onOpenUpdatePageDrawer();
    }
    const editPageURL = websiteRoutes
      .app({ appId: currentApp?.id })
      .site({ site: site?.id || "" })
      .page({ page: page?.id, version: page?.version?.id }).home;
    router.push(editPageURL);
  };
  return (
    <Card>
      <CardBody>
        <UpdatePageDrawer
          page={page}
          isOpenDrawer={isOpenUpdatePageDrawer}
          onCloseDrawer={onCloseUpdatePageDrawer}
        />
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
          <Stack direction="column" spacing="3">
            <Stack direction="column" spacing="1">
              <Title fontSize="medium">{page?.title}</Title>
              <Text fontSize="x-small">
                {translate.formatMessage({ id: "version" })}:{" "}
                {page?.version?.name}
              </Text>
            </Stack>
            {existsDefaultPage && (
              <Stack direction="row" spacing="1">
                {isHomePage && (
                  <Badge colorScheme="green">{translate.formatMessage({ id: "homePage" })}</Badge>
                )}
                {isLoginPage && (
                  <Badge colorScheme="gray">{translate.formatMessage({ id: "loginPage" })}</Badge>
                )}
                {isSignUpPage && (
                  <Badge colorScheme="orange">{translate.formatMessage({ id: "signUpPage" })}</Badge>
                )}
              </Stack>
            )}
          </Stack>
          <Button onClick={onUpdatePageOrGoToEditPage} variant="ghost">
            {translate.formatMessage({ id: "edit" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
