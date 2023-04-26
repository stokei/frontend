import { AppLogo, Footer, Sidebar } from "@/components";
import { AdminCourseLayoutContent } from "@/components/admin-course-layout-content";
import { CustomersCourseProvider, SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";

export interface CourseLayoutProps {}

export const CourseLayout: FC<PropsWithChildren<CourseLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const baseRoute = routes.customers.course({ course: courseId || "" });

  const isActiveRoute = useCallback(
    (route: string) => router.asPath?.startsWith(route),
    [router.asPath]
  );

  const modulesIsActive = useMemo(
    () => isActiveRoute(baseRoute.modules) || isActiveRoute(baseRoute.videos),
    [baseRoute, isActiveRoute]
  );

  return (
    <CustomersCourseProvider>
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
                href={baseRoute.home}
                isActive={router.asPath === baseRoute.home}
              >
                {translate.formatMessage({ id: "about" })}
              </SidebarNavLink>
              <SidebarNavLink
                as={NextLink}
                href={baseRoute.modules}
                isActive={modulesIsActive}
              >
                {translate.formatMessage({ id: "modules" })}
              </SidebarNavLink>
            </SidebarBody>
          </Sidebar>
          <AdminCourseLayoutContent>
            <Box flex="1" flexDirection="column">
              {children}
            </Box>
            <Footer />
          </AdminCourseLayoutContent>
        </Box>
      </SidebarProvider>
    </CustomersCourseProvider>
  );
};
