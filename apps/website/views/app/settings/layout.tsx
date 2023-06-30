import { AppLogo, Footer, Sidebar } from "@/components";
import { AppSettingsLayoutContent } from "@/components/app-settings-layout-content";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

export interface SettingsLayoutProps {}

export const SettingsLayout: FC<PropsWithChildren<SettingsLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const baseAppRoutes = routes.app({ appId: currentApp?.id });
  const baseRoute = baseAppRoutes.settings;

  return (
    <SidebarProvider>
      <Box width="full" flexDirection="row">
        <Sidebar>
          <SidebarHeader>
            <AppLogo />
          </SidebarHeader>
          <SidebarBody paddingX="0">
            <SidebarNavLink
              as={NextLink}
              href={baseAppRoutes.home}
              isActive={router.asPath === baseAppRoutes.home}
            >
              {translate.formatMessage({ id: "home" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.home}
              isActive={router.asPath === baseRoute.home}
            >
              {translate.formatMessage({ id: "informations" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AppSettingsLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AppSettingsLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
