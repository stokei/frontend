import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarLayoutContent } from "@/components/sidebar-layout-content";
import { ComponentsTreeProvider, SidebarProvider } from "@/contexts";
import { PageProvider } from "@/contexts/page";
import { SiteProvider } from "@/contexts/site";
import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { GetVersionResponse } from "@/services/axios/models/version";
import { GlobalPageFragment } from "@/services/graphql/queries/get-page-by-id/page.query.graphql.generated";
import {
  Box,
  Loading,
  SidebarBody,
  SidebarGroup,
  SidebarGroupButton,
  SidebarGroupPanel,
  SidebarHeader,
  SidebarNavLink,
  useDisclosure,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { AddPageDrawer } from "../../components/add-page-drawer";
import { PagesList } from "../../components/pages-list";
import { ComponentsMenu } from "./components/components-menu";
import { VersionsList } from "./components/versions-list";

export interface PageLayoutProps {
  version: GetVersionResponse;
  page: GlobalPageFragment;
}

const PageLayout = ({ children, page }: PropsWithChildren<PageLayoutProps>) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { siteId, isLoadingSite } = useSite();
  const baseRoutes = routes.app({ appId: currentApp?.id });
  const baseSiteRoutes = baseRoutes.site({ site: siteId || "" });
  const {
    isOpen: isOpenAddPageDrawer,
    onClose: onCloseAddPageDrawer,
    onOpen: onOpenAddPageDrawer,
  } = useDisclosure();

  if (isLoadingSite) {
    return <Loading />;
  }

  return (
    <Box width="full" flexDirection="row">
      <AddPageDrawer
        isOpenDrawer={isOpenAddPageDrawer}
        onCloseDrawer={onCloseAddPageDrawer}
      />
      <Sidebar>
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarBody paddingX="0">
          <SidebarNavLink
            leftIcon="back"
            as={NextLink}
            href={baseSiteRoutes.home}
            isActive={router.asPath === baseSiteRoutes.home}
          >
            {translate.formatMessage({ id: "back" })}
          </SidebarNavLink>

          <SidebarGroup>
            <SidebarGroupButton leftIcon="component">
              {translate.formatMessage({ id: "components" })}
            </SidebarGroupButton>
            <SidebarGroupPanel>
              <ComponentsMenu />
            </SidebarGroupPanel>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupButton leftIcon="page">
              {translate.formatMessage({ id: "pages" })}
            </SidebarGroupButton>
            <SidebarGroupPanel>
              <SidebarNavLink
                leftIcon="plus"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenAddPageDrawer();
                }}
              >
                {translate.formatMessage({ id: "add" })}
              </SidebarNavLink>
              <PagesList />
            </SidebarGroupPanel>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupButton leftIcon="version">
              {translate.formatMessage({ id: "versions" })}
            </SidebarGroupButton>
            <SidebarGroupPanel>
              <VersionsList />
            </SidebarGroupPanel>
          </SidebarGroup>
        </SidebarBody>
      </Sidebar>
      <SidebarLayoutContent>
        <Box flex="1" flexDirection="column">
          <>{children}</>
        </Box>
        <Footer />
      </SidebarLayoutContent>
    </Box>
  );
};

const LayoutWithProviders = (props: PropsWithChildren<PageLayoutProps>) => {
  return (
    <SiteProvider>
      <SidebarProvider>
        <PageProvider {...props}>
          <ComponentsTreeProvider version={props?.version}>
            <PageLayout {...props} />
          </ComponentsTreeProvider>
        </PageProvider>
      </SidebarProvider>
    </SiteProvider>
  );
};

export { LayoutWithProviders as PageLayout };
