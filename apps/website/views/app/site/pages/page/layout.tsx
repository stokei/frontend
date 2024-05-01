import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarLayoutContent } from "@/components/sidebar-layout-content";
import {
  ComponentsTreeProvider,
  PageBuilderProvider,
  SidebarProvider,
} from "@/contexts";
import { PageProvider } from "@/contexts/page";
import { SiteProvider } from "@/contexts/site";
import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
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
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { ComponentsMenu } from "./components/components-menu";
import { VersionsList } from "./components/versions-list";

export interface PageLayoutProps {
  version: GetVersionResponse;
  page: GlobalPageFragment;
}

const PageLayout = ({ children }: PropsWithChildren<PageLayoutProps>) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { siteId, isLoadingSite } = useSite();
  const baseRoutes = websiteRoutes.app({ appId: currentApp?.id });
  const baseSiteRoutes = baseRoutes.site({ site: siteId || "" });

  if (isLoadingSite) {
    return <Loading />;
  }

  return (
    <Box width="full" flexDirection="row">
      <Sidebar>
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarBody paddingX="0">
          <SidebarNavLink
            leftIcon="back"
            as={NextLink}
            href={baseSiteRoutes.pages}
          >
            {translate.formatMessage({ id: "back" })}
          </SidebarNavLink>

          <SidebarNavLink
            leftIcon="page"
            as={NextLink}
            href={baseSiteRoutes.pages}
            isActive={router.asPath === baseSiteRoutes.pages}
          >
            {translate.formatMessage({ id: "pages" })}
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
          <PageBuilderProvider>
            <ComponentsTreeProvider version={props?.version}>
              <PageLayout {...props} />
            </ComponentsTreeProvider>
          </PageBuilderProvider>
        </PageProvider>
      </SidebarProvider>
    </SiteProvider>
  );
};

export { LayoutWithProviders as PageLayout };
