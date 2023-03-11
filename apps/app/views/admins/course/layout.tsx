import { AppLogo, Footer, Sidebar } from "@/components";
import { SidebarProvider } from "@/contexts";
import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, SidebarBody, SidebarHeader, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

export interface CourseLayoutProps {
  readonly courseId?: string;
}

export const CourseLayout: FC<PropsWithChildren<CourseLayoutProps>> = ({
  courseId,
  children,
}) => {
  const router = useRouter();
  const translate = useTranslations();
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
              href={baseRoute.home}
              isActive={router.asPath === baseRoute.home}
            >
              {translate.formatMessage({ id: "home" })}
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
