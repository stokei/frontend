import { AppLogo, Footer, Sidebar } from "@/components";
import { AppSettingsLayoutContent } from "@/components/app-settings-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
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
  const baseRoute = routes.app().settings;

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
              href={routes.app().home}
              isActive={router.asPath === routes.app().home}
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
