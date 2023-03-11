import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

export interface AdminLayoutProps {}

export const AdminLayout: FC<PropsWithChildren<AdminLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();

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
              href={routes.admins.financial}
              isActive={router.asPath === routes.admins.financial}
            >
              {translate.formatMessage({ id: "financial" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.subscriptions.home}
              isActive={router.asPath === routes.admins.subscriptions.home}
            >
              {translate.formatMessage({ id: "subscriptions" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.invoices}
              isActive={router.asPath === routes.admins.invoices}
            >
              {translate.formatMessage({ id: "invoices" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.members}
              isActive={router.asPath === routes.admins.members}
            >
              {translate.formatMessage({ id: "members" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.courses}
              isActive={router.asPath === routes.admins.courses}
            >
              {translate.formatMessage({ id: "courses" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={routes.admins.settings.home}
              isActive={router.asPath === routes.admins.settings.home}
            >
              {translate.formatMessage({ id: "settings" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <Box flex="1" flexDirection="column" minHeight="100vh">
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </SidebarProvider>
  );
};
