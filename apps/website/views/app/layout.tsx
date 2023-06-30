import { AppLogo, Footer, Sidebar } from "@/components";
import { AppLayoutContent } from "@/components/app-layout-content";
import { STRIPE_DASHBOARD_URL } from "@/constants/stripe-links";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback } from "react";

export interface AppLayoutProps {}

export const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const baseRoutes = routes.app({ appId: currentApp?.id });

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
              href={baseRoutes.home}
              isActive={router.asPath === baseRoutes.home}
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
              href={baseRoutes.courses}
              isActive={isActiveRoute(baseRoutes.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.products.home}
              isActive={isActiveRoute(baseRoutes.products.home)}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.onboardings.home}
              isActive={isActiveRoute(baseRoutes.onboardings.home)}
            >
              {translate.formatMessage({ id: "onboardings" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.subscriptions.home}
              isActive={isActiveRoute(baseRoutes.subscriptions.home)}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.invoices}
              isActive={isActiveRoute(baseRoutes.invoices)}
            >
              {translate.formatMessage({ id: "invoices" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.members}
              isActive={isActiveRoute(baseRoutes.members)}
            >
              {translate.formatMessage({ id: "members" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoutes.settings.home}
              isActive={isActiveRoute(baseRoutes.settings.home)}
            >
              {translate.formatMessage({ id: "settings" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AppLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AppLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
