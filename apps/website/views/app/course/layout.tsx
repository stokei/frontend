import { AppLogo, Footer, Sidebar } from "@/components";
import { AppCourseLayoutContent } from "@/components/app-course-layout-content";
import { SidebarProvider } from "@/contexts";
import { useCurrentApp, useTranslations } from "@/hooks";
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
  const { currentApp } = useCurrentApp();
  const baseAppRoutes = routes.app({ appId: currentApp?.id });
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const baseRoute = baseAppRoutes.course({ course: courseId });

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
              href={baseAppRoutes.home}
              isActive={router.asPath === baseAppRoutes.home}
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
              href={baseRoute.students}
              isActive={isActiveRoute(baseRoute.students)}
            >
              {translate.formatMessage({ id: "students" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.instructors}
              isActive={isActiveRoute(baseRoute.instructors)}
            >
              {translate.formatMessage({ id: "instructors" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.modules.home}
              isActive={isActiveRoute(baseRoute.modules.home)}
            >
              {translate.formatMessage({ id: "modules" })}
            </SidebarNavLink>
          </SidebarBody>
        </Sidebar>
        <AppCourseLayoutContent>
          <Box flex="1" flexDirection="column">
            {children}
          </Box>
          <Footer />
        </AppCourseLayoutContent>
      </Box>
    </SidebarProvider>
  );
};
