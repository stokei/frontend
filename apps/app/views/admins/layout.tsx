import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
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
import { FC, PropsWithChildren, useMemo } from "react";

export interface AdminLayoutProps {}

export const AdminLayout: FC<PropsWithChildren<AdminLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();

  const membersIsActive = useMemo(
    () => Object.values(routes.admins.members).includes(router.asPath),
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
            <SidebarGroup isActive={membersIsActive}>
              <SidebarGroupButton>
                {translate.formatMessage({ id: "members" })}
              </SidebarGroupButton>
              <SidebarGroupPanel>
                <SidebarNavLink
                  as={NextLink}
                  href={routes.admins.members.all}
                  isActive={router.asPath === routes.admins.members.all}
                >
                  {translate.formatMessage({ id: "all" })}
                </SidebarNavLink>
                <SidebarNavLink
                  as={NextLink}
                  href={routes.admins.members.admins}
                  isActive={router.asPath === routes.admins.members.admins}
                >
                  {translate.formatMessage({ id: "admins" })}
                </SidebarNavLink>
                <SidebarNavLink
                  as={NextLink}
                  href={routes.admins.members.instructors}
                  isActive={router.asPath === routes.admins.members.instructors}
                >
                  {translate.formatMessage({ id: "instructors" })}
                </SidebarNavLink>
              </SidebarGroupPanel>
            </SidebarGroup>
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
