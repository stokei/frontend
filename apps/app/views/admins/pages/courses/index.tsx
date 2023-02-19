import { useTranslations } from "@/hooks";
import { CoursesList } from "@/views/admins/components/courses-list";
import { CoursesNavbar } from "@/views/admins/components/courses-navbar";
import { useGetCoursesQuery } from "@/views/admins/graphql/courses.query.graphql.generated";
import { AdminLayout } from "@/views/admins/layout";
import { Box, Button, Container } from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { AdminsCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { Loading } from "./loading";

interface AdminsCoursesPageProps {}

export const AdminsCoursesPage: FC<AdminsCoursesPageProps> = () => {
  const [courses, setCourses] = useState<AdminsCourseFragment[]>([]);

  const translate = useTranslations();
  const [{ data: dataGetCourses, fetching: isLoading }] = useGetCoursesQuery();

  useEffect(() => {
    if (!!dataGetCourses?.courses?.items?.length) {
      setCourses(dataGetCourses?.courses?.items);
    }
  }, [dataGetCourses]);

  return (
    <AdminLayout>
      <CoursesNavbar />
      <Box width="full" flexDirection="row">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            {courses?.length > 1 && (
              <Box width="full" marginBottom="5">
                <Button>{translate.formatMessage({ id: "addCourse" })}</Button>
              </Box>
            )}
            <CoursesList courses={courses} />
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
