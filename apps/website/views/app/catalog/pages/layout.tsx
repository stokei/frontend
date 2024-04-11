import { AppLogo, Footer, Sidebar } from "@/components";
import { AppCatalogLayoutContent } from "@/components/app-catalog-layout-content";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback, useMemo } from "react";

export interface CatalogLayoutProps {}

export const CatalogLayout = ({
  children,
}: PropsWithChildren<CatalogLayoutProps>) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const baseAppRoutes = websiteRoutes.app({ appId: currentApp?.id });
  const catalogId = useMemo(
    () => router?.query?.catalogId?.toString() || "",
    [router]
  );
  const baseRoute = baseAppRoutes.catalog({ catalog: catalogId });

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
              leftIcon="home"
              as={NextLink}
              href={baseAppRoutes.home}
              isActive={router.asPath === baseAppRoutes.home}
            >
              {translate.formatMessage({ id: "home" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="about"
              as={NextLink}
              href={baseRoute.home}
              isActive={router.asPath === baseRoute.home}
            >
              {translate.formatMessage({ id: "about" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="product"
              as={NextLink}
              href={baseRoute.products}
              isActive={isActiveRoute(baseRoute.products)}
            >
              {translate.formatMessage({ id: "products" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AppCatalogLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AppCatalogLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
