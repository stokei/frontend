import { AppLogo, Footer, Sidebar } from "@/components";
import { AppProductLayoutContent } from "@/components/app-product-layout-content";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback, useMemo } from "react";

export interface ProductLayoutProps {}

export const ProductLayout = ({
  children,
}: PropsWithChildren<ProductLayoutProps>) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const baseAppRoutes = routes.app({ appId: currentApp?.id });
  const productId = useMemo(
    () => router?.query?.productId?.toString() || "",
    [router]
  );
  const baseRoute = baseAppRoutes.product({ product: productId });

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
              leftIcon="price"
              as={NextLink}
              href={baseRoute.prices}
              isActive={isActiveRoute(baseRoute.prices)}
            >
              {translate.formatMessage({ id: "prices" })}
            </SidebarNavLink>
            <SidebarNavLink
              leftIcon="feature"
              as={NextLink}
              href={baseRoute.features}
              isActive={isActiveRoute(baseRoute.features)}
            >
              {translate.formatMessage({ id: "features" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AppProductLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AppProductLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
