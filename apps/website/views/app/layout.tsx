import { AppLogo, Footer, Sidebar } from "@/components";
import { AppLayoutContent } from "@/components/app-layout-content";
import { STRIPE_DASHBOARD_URL } from "@/constants/stripe-links";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Box,
  Icon,
  SidebarBody,
  SidebarGroup,
  SidebarGroupButton,
  SidebarGroupPanel,
  SidebarHeader,
  SidebarNavLink,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";

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

  const isActiveSettings = useMemo(() => {
    return (
      isActiveRoute(baseRoutes.settings.home) ||
      isActiveRoute(baseRoutes.onboardings.home)
    );
  }, [baseRoutes.onboardings.home, baseRoutes.settings.home, isActiveRoute]);

  return (
    <SidebarProvider>
      <Box width="full" flexDirection="row">
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
              {translate.formatMessage({ id: "dashboard" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="price"
              as={NextLink}
              href={STRIPE_DASHBOARD_URL}
              target="_blank"
            >
              {translate.formatMessage({ id: "financial" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="course"
              as={NextLink}
              href={baseRoutes.courses}
              isActive={isActiveRoute(baseRoutes.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="product"
              as={NextLink}
              href={baseRoutes.products.home}
              isActive={isActiveRoute(baseRoutes.products.home)}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="subscription"
              as={NextLink}
              href={baseRoutes.subscriptions.home}
              isActive={isActiveRoute(baseRoutes.subscriptions.home)}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="invoice"
              as={NextLink}
              href={baseRoutes.invoices}
              isActive={isActiveRoute(baseRoutes.invoices)}
            >
              {translate.formatMessage({ id: "invoices" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="user"
              as={NextLink}
              href={baseRoutes.members}
              isActive={isActiveRoute(baseRoutes.members)}
            >
              {translate.formatMessage({ id: "members" })}
            </SidebarNavLink>
            <SidebarGroup isActive={isActiveSettings}>
              <SidebarGroupButton leftIcon="setting">
                {translate.formatMessage({ id: "settings" })}
              </SidebarGroupButton>
              <SidebarGroupPanel>
                <SidebarNavLink
                  as={NextLink}
                  href={baseRoutes.settings.home}
                  isActive={router.asPath === baseRoutes.settings.home}
                >
                  {translate.formatMessage({ id: "app" })}
                </SidebarNavLink>
                <SidebarNavLink
                  as={NextLink}
                  href={baseRoutes.settings.website}
                  isActive={router.asPath === baseRoutes.settings.website}
                >
                  {translate.formatMessage({ id: "website" })}
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
                  href={baseRoutes.settings.domains}
                  isActive={router.asPath === baseRoutes.settings.domains}
                >
                  {translate.formatMessage({ id: "domains" })}
                </SidebarNavLink>
              </SidebarGroupPanel>
            </SidebarGroup>
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
