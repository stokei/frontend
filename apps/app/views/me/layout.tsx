import { AppLogo, Footer, Sidebar } from "@/components";
import { MeLayoutContent } from "@/components/me-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { removeRouteSitePrefix } from "@/utils/remove-route-site-prefix";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback } from "react";

export interface MeLayoutProps {}

export const MeLayout = ({ children }: PropsWithChildren<MeLayoutProps>) => {
  const router = useRouter();
  const translate = useTranslations();

  const isActiveHome = useCallback(
    (route: string) => removeRouteSitePrefix(router.route) === route,
    [router.route]
  );
  const isActiveRoute = useCallback(
    (route: string) => removeRouteSitePrefix(router.route)?.startsWith(route),
    [router.route]
  );

  return (
    <SidebarProvider>
      <Box width="full" flexDirection="row">
        <Sidebar>
          <SidebarHeader>
            <AppLogo />
          </SidebarHeader>
          <SidebarBody paddingX="0">
            <SidebarNavLink
              leftIcon="user"
              as={NextLink}
              href={routes.me.account}
              isActive={isActiveHome(routes.me.account)}
            >
              {translate.formatMessage({ id: "account" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="password"
              as={NextLink}
              href={routes.me.password}
              isActive={isActiveRoute(routes.me.password)}
            >
              {translate.formatMessage({ id: "password" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <MeLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </MeLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
