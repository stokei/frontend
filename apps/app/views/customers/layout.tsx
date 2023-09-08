import { AppLogo, Footer, Sidebar } from "@/components";
import { BadgeNew } from "@/components/badge-new";
import { CustomerLayoutContent } from "@/components/customer-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { removeRouteAppPrefix } from "@/utils/remove-route-app-prefix";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback } from "react";

export interface CustomerLayoutProps {}

export const CustomerLayout: FC<PropsWithChildren<CustomerLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();

  const isActiveHome = useCallback(
    (route: string) => removeRouteAppPrefix(router.route) === route,
    [router.route]
  );
  const isActiveRoute = useCallback(
    (route: string) => removeRouteAppPrefix(router.route)?.startsWith(route),
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
              leftIcon="product"
              href={routes.customers.products}
              isActive={isActiveHome(routes.customers.products)}
              badge={<BadgeNew />}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="course"
              href={routes.customers.courses}
              isActive={isActiveRoute(routes.customers.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="material"
              href={routes.customers.materials}
              isActive={isActiveRoute(routes.customers.materials)}
            >
              {translate.formatMessage({ id: "materials" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="order"
              href={routes.customers.orders.home}
              isActive={isActiveRoute(routes.customers.orders.home)}
            >
              {translate.formatMessage({ id: "orders" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              leftIcon="subscription"
              href={routes.customers.subscriptions.home}
              isActive={isActiveRoute(routes.customers.subscriptions.home)}
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
