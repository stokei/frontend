import { AppLogo, Footer, Sidebar } from "@/components";
import { AdminLayoutContent } from "@/components/admin-layout-content";
import { STRIPE_DASHBOARD_URL } from "@/constants/stripe-links";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback } from "react";

export interface AdminLayoutProps {}

export const AdminLayout: FC<PropsWithChildren<AdminLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();

  const isActiveRoute = useCallback(
    (route: string) => !!router.asPath?.match(route),
    [router.asPath]
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
              href={routes.admins.home}
              isActive={router.asPath === routes.admins.home}
            >
              {translate.formatMessage({ id: "dashboard" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={STRIPE_DASHBOARD_URL}
              target="_blank"
            >
              {translate.formatMessage({ id: "financial" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.courses}
              isActive={isActiveRoute(routes.admins.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.products.home}
              isActive={isActiveRoute(routes.admins.products.home)}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.onboardings.home}
              isActive={isActiveRoute(routes.admins.onboardings.home)}
            >
              {translate.formatMessage({ id: "onboardings" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.subscriptions.home}
              isActive={isActiveRoute(routes.admins.subscriptions.home)}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.invoices}
              isActive={isActiveRoute(routes.admins.invoices)}
            >
              {translate.formatMessage({ id: "invoices" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.members}
              isActive={isActiveRoute(routes.admins.members)}
            >
              {translate.formatMessage({ id: "members" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.settings.home}
              isActive={isActiveRoute(routes.admins.settings.home)}
            >
              {translate.formatMessage({ id: "settings" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AdminLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AdminLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
