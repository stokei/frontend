import { AppLogo, Footer, Sidebar } from "@/components";
import { CustomerLayoutContent } from "@/components/customer-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
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

  const isActiveRoute = useCallback(
    (route: string) => router.asPath?.startsWith(route),
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
              href={routes.customers.home}
              isActive={router.asPath === routes.customers.home}
            >
              {translate.formatMessage({ id: "home" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.customers.courses}
              isActive={isActiveRoute(routes.customers.courses)}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
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
