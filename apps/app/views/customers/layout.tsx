import { AppLogo, Footer, Sidebar } from "@/components";
import { BadgeNew } from "@/components/badge-new";
import { CustomerLayoutContent } from "@/components/customer-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { removeRouteSitePrefix } from "@/utils/remove-route-site-prefix";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback } from "react";

export const CustomerLayout = ({ children }: PropsWithChildren) => {
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
              as={NextLink}
              leftIcon="store"
              href={appRoutes.store.home}
              isActive={isActiveHome(appRoutes.store.home)}
              badge={<BadgeNew />}
            >
              {translate.formatMessage({ id: "store" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="course"
              href={appRoutes.customers.courses}
              isActive={isActiveRoute(appRoutes.customers.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="material"
              href={appRoutes.customers.materials}
              isActive={isActiveRoute(appRoutes.customers.materials)}
            >
              {translate.formatMessage({ id: "materials" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="order"
              href={appRoutes.customers.orders.home}
              isActive={isActiveRoute(appRoutes.customers.orders.home)}
            >
              {translate.formatMessage({ id: "orders" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="subscription"
              href={appRoutes.customers.subscriptions.home}
              isActive={isActiveRoute(appRoutes.customers.subscriptions.home)}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <CustomerLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </CustomerLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
