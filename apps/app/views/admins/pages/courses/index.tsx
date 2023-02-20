import { useTranslations } from "@/hooks";
import { CoursesList } from "@/views/admins/components/courses-list";
import { CoursesNavbar } from "@/views/admins/components/courses-navbar";
import { useGetCoursesQuery } from "@/views/admins/graphql/courses.query.graphql.generated";
import { AdminLayout } from "@/views/admins/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useState } from "react";
import { AddCourseDrawer } from "../../components/add-course-drawer";
import { AdminsCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { Loading } from "./loading";

interface AdminsCoursesPageProps {}

export const AdminsCoursesPage: FC<AdminsCoursesPageProps> = () => {
  const {
    isOpen: isOpenAddCourseDrawer,
    onClose: onCloseAddCourseDrawer,
    onOpen: onOpenAddCourseDrawer,
  } = useDisclosure();
  const [courses, setCourses] = useState<AdminsCourseFragment[]>([]);

  const translate = useTranslations();
  const [{ data: dataGetCourses, fetching: isLoading }] = useGetCoursesQuery();

  useEffect(() => {
    if (!!dataGetCourses?.courses?.items?.length) {
      setCourses(dataGetCourses?.courses?.items);
    }
  }, [dataGetCourses]);

  const onCourseCreated = useCallback((newCourse: AdminsCourseFragment) => {
    setCourses((currentCourses) => [...currentCourses, newCourse]);
  }, []);

  return (
    <AdminLayout>
      <CoursesNavbar />
      <Box width="full" flexDirection="row">
        <AddCourseDrawer
          isOpenDrawer={isOpenAddCourseDrawer}
          onCloseDrawer={onCloseAddCourseDrawer}
          onSuccess={onCourseCreated}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            {courses?.length > 1 ? (
              <Box width="full" marginBottom="5">
                <Button onClick={onOpenAddCourseDrawer}>
                  {translate.formatMessage({ id: "addCourse" })}
                </Button>
              </Box>
            ) : (
              <NotFound>
                <NotFoundIcon name="course" />
                <NotFoundTitle>
                  {translate.formatMessage({ id: "startTeachingNow" })}
                </NotFoundTitle>
                <NotFoundSubtitle>
                  {translate.formatMessage({
                    id: "createYourCourseAndMakeADifferenceInTheLivesOfYourStudents",
                  })}
                </NotFoundSubtitle>
                <Button>{translate.formatMessage({ id: "addCourse" })}</Button>
              </NotFound>
            )}
            <CoursesList courses={courses} />
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
