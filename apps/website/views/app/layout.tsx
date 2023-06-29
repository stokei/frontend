import { AppLogo, Footer, Sidebar } from "@/components";
import { AppLayoutContent } from "@/components/app-layout-content";
import { STRIPE_DASHBOARD_URL } from "@/constants/stripe-links";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
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
              href={routes.app().home}
              isActive={router.asPath === routes.app().home}
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
              href={routes.app().courses}
              isActive={isActiveRoute(routes.app().courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().products.home}
              isActive={isActiveRoute(routes.app().products.home)}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().onboardings.home}
              isActive={isActiveRoute(routes.app().onboardings.home)}
            >
              {translate.formatMessage({ id: "onboardings" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().subscriptions.home}
              isActive={isActiveRoute(routes.app().subscriptions.home)}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().invoices}
              isActive={isActiveRoute(routes.app().invoices)}
            >
              {translate.formatMessage({ id: "invoices" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().members}
              isActive={isActiveRoute(routes.app().members)}
            >
              {translate.formatMessage({ id: "members" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.app().settings.home}
              isActive={isActiveRoute(routes.app().settings.home)}
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
