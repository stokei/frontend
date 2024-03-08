import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarLayoutContent } from "@/components/sidebar-layout-content";
import { SidebarProvider } from "@/contexts";
import { SiteProvider } from "@/contexts/site";
import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { routes } from "@/routes";
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
import { PagesList } from "./components/pages-list";
import { AddPageDrawer } from "./components/add-page-drawer";

const SiteLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { siteId, isLoadingSite } = useSite();
  const baseRoutes = routes.app({ appId: currentApp?.id });
  const baseSiteRoutes = routes
    .app({ appId: currentApp?.id })
    .site({ site: siteId || "" });
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
            leftIcon="home"
            as={NextLink}
            href={baseRoutes.home}
            isActive={router.asPath === baseRoutes.home}
          >
            {translate.formatMessage({ id: "home" })}
          </SidebarNavLink>
          <SidebarNavLink
            leftIcon="about"
            as={NextLink}
            href={baseSiteRoutes.home}
            isActive={router.asPath === baseSiteRoutes.home}
          >
            {translate.formatMessage({ id: "about" })}
          </SidebarNavLink>
          <SidebarNavLink
            leftIcon="about"
            as={NextLink}
            href={baseSiteRoutes.home}
            isActive={router.asPath === baseSiteRoutes.home}
          >
            {translate.formatMessage({ id: "components" })}
          </SidebarNavLink>
          <SidebarGroup isActive={!!router.asPath?.match(baseSiteRoutes.pages)}>
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
          <SidebarNavLink
            leftIcon="domain"
            as={NextLink}
            href={baseSiteRoutes.domains}
            isActive={router.asPath === baseSiteRoutes.domains}
          >
            {translate.formatMessage({ id: "domains" })}
          </SidebarNavLink>
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

const LayoutWithProviders = (props: PropsWithChildren) => {
  return (
    <SiteProvider>
      <SidebarProvider>
        <SiteLayout {...props} />
      </SidebarProvider>
    </SiteProvider>
  );
};

export { LayoutWithProviders as SiteLayout };
