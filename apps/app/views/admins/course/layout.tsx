import { AppLogo, Footer, Sidebar } from "@/components";
import { AdminCourseLayoutContent } from "@/components/admin-course-layout-content";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useMemo } from "react";

export interface CourseLayoutProps {}

export const CourseLayout: FC<PropsWithChildren<CourseLayoutProps>> = ({
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const baseRoute = routes.admins.course({ course: courseId });

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
              isActive={router.asPath === baseRoute.students}
            >
              {translate.formatMessage({ id: "students" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.instructors}
              isActive={router.asPath === baseRoute.instructors}
            >
              {translate.formatMessage({ id: "instructors" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.modules}
              isActive={router.asPath === baseRoute.modules}
            >
              {translate.formatMessage({ id: "modules" })}
            </SidebarNavLink>
            <SidebarNavLink
              as={NextLink}
              href={baseRoute.products}
              isActive={router.asPath === baseRoute.products}
            >
              {translate.formatMessage({ id: "products" })}
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
  );
};
