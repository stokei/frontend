import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarLayoutContent } from "@/components/sidebar-layout-content";
import { SidebarProvider } from "@/contexts";
import { SiteProvider } from "@/contexts/site";
import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Box,
  Loading,
  SidebarBody,
  SidebarHeader,
  SidebarNavLink,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { UpdateSiteNameForm } from "./components/update-site-name-form";

const SiteLayout = ({ children }: PropsWithChildren) => {
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
          <Box padding="5" paddingTop="0" flexDirection="column">
            <UpdateSiteNameForm />
          </Box>

          <SidebarNavLink
            leftIcon="back"
            as={NextLink}
            href={baseRoutes.sites.home}
            isActive={router.asPath === baseRoutes.sites.home}
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
