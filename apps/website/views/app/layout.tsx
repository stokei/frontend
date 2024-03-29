import { AppLogo, Footer, Sidebar } from "@/components";
import { AppLayoutContent } from "@/components/app-layout-content";
import { BadgeNew } from "@/components/badge-new";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Box,
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

  const isActiveProducts = useMemo(() => {
    return (
      isActiveRoute(baseRoutes.products.home) ||
      isActiveRoute(baseRoutes.catalogs.home)
    );
  }, [baseRoutes, isActiveRoute]);

  const isActiveSales = useMemo(() => {
    return (
      isActiveRoute(baseRoutes.orders.home) ||
      isActiveRoute(baseRoutes.subscriptions.home) ||
      isActiveRoute(baseRoutes.payments.home) ||
      isActiveRoute(baseRoutes.invoices)
    );
  }, [baseRoutes, isActiveRoute]);

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
              href={baseRoutes.financial.home}
              isActive={isActiveRoute(baseRoutes.financial.home)}
            >
              {translate.formatMessage({ id: "financial" })}
            </SidebarNavLink>
            <SidebarGroup isActive={isActiveSales}>
              <SidebarGroupButton leftIcon="sale">
                {translate.formatMessage({ id: "sales" })}
              </SidebarGroupButton>
              <SidebarGroupPanel>
                <SidebarNavLink
                  leftIcon="subscription"
                  as={NextLink}
                  href={baseRoutes.subscriptions.home}
                  isActive={isActiveRoute(baseRoutes.subscriptions.home)}
                >
                  {translate.formatMessage({ id: "subscriptions" })}
                </SidebarNavLink>
                {/* <SidebarNavLink
                  leftIcon="invoice"
                  as={NextLink}
                  href={baseRoutes.invoices}
                  isActive={isActiveRoute(baseRoutes.invoices)}
                >
                  {translate.formatMessage({ id: "invoices" })}
                </SidebarNavLink> */}
                <SidebarNavLink
                  leftIcon="order"
                  as={NextLink}
                  href={baseRoutes.orders.home}
                  isActive={isActiveRoute(baseRoutes.orders.home)}
                >
                  {translate.formatMessage({ id: "orders" })}
                </SidebarNavLink>
                <SidebarNavLink
                  leftIcon="price"
                  as={NextLink}
                  href={baseRoutes.payments.home}
                  isActive={isActiveRoute(baseRoutes.payments.home)}
                >
                  {translate.formatMessage({ id: "payments" })}
                </SidebarNavLink>
              </SidebarGroupPanel>
            </SidebarGroup>
            <SidebarGroup isActive={isActiveProducts}>
              <SidebarGroupButton leftIcon="product" badge={<BadgeNew />}>
                {translate.formatMessage({ id: "products" })}
              </SidebarGroupButton>
              <SidebarGroupPanel>
                <SidebarNavLink
                  as={NextLink}
                  leftIcon="catalog"
                  href={baseRoutes.catalogs.home}
                  isActive={isActiveRoute(baseRoutes.catalogs.home)}
                >
                  {translate.formatMessage({ id: "catalogs" })}
                </SidebarNavLink>
                <SidebarNavLink
                  as={NextLink}
                  leftIcon="product"
                  href={baseRoutes.products.home}
                  isActive={isActiveRoute(baseRoutes.products.home)}
                >
                  {translate.formatMessage({ id: "products" })}
                </SidebarNavLink>
                <SidebarNavLink
                  as={NextLink}
                  leftIcon="coupon"
                  href={baseRoutes.coupons.home}
                  badge={<BadgeNew />}
                  isActive={isActiveRoute(baseRoutes.coupons.home)}
                >
                  {translate.formatMessage({ id: "coupons" })}
                </SidebarNavLink>
              </SidebarGroupPanel>
            </SidebarGroup>
            <SidebarNavLink
              leftIcon="course"
              as={NextLink}
              href={baseRoutes.courses}
              isActive={isActiveRoute(baseRoutes.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="material"
              as={NextLink}
              href={baseRoutes.materials.home}
              isActive={isActiveRoute(baseRoutes.materials.home)}
            >
              {translate.formatMessage({ id: "materials" })}
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
                  leftIcon="app"
                  as={NextLink}
                  href={baseRoutes.settings.home}
                  isActive={router.asPath === baseRoutes.settings.home}
                >
                  {translate.formatMessage({ id: "app" })}
                </SidebarNavLink>
                <SidebarNavLink
                  leftIcon="price"
                  as={NextLink}
                  href={baseRoutes.settings.billing}
                  isActive={router.asPath === baseRoutes.settings.billing}
                >
                  {translate.formatMessage({ id: "billing" })}
                </SidebarNavLink>
                <SidebarNavLink
                  leftIcon="website"
                  as={NextLink}
                  href={baseRoutes.settings.website}
                  isActive={router.asPath === baseRoutes.settings.website}
                >
                  {translate.formatMessage({ id: "website" })}
                </SidebarNavLink>
                <SidebarNavLink
                  leftIcon="onboarding"
                  as={NextLink}
                  href={baseRoutes.onboardings.home}
                  isActive={isActiveRoute(baseRoutes.onboardings.home)}
                >
                  {translate.formatMessage({ id: "onboardings" })}
                </SidebarNavLink>
                <SidebarNavLink
                  leftIcon="domain"
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
