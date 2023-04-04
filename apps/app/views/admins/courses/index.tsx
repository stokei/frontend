import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { AdminLayout } from "@/views/admins/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
  Pagination,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useState } from "react";
import { AddCourseDrawer } from "./components/add-course-drawer";
import { CoursesList } from "./components/courses-list";
import { Navbar } from "./components/navbar";
import { AppCourseFragment } from "./graphql/course.fragment.graphql.generated";
import { useGetCoursesQuery } from "./graphql/courses.query.graphql.generated";
import { Loading } from "./loading";

interface CoursesPageProps {}

export const CoursesPage: FC<CoursesPageProps> = () => {
  const {
    isOpen: isOpenAddCourseDrawer,
    onClose: onCloseAddCourseDrawer,
    onOpen: onOpenAddCourseDrawer,
  } = useDisclosure();
  const [courses, setCourses] = useState<AppCourseFragment[]>([]);

  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();

  const [{ data: dataGetCourses, fetching: isLoading }] = useGetCoursesQuery({
    variables: {
      where: {
        AND: {
          parent: {
            equals: currentApp?.id,
          },
        },
      },
      page: {
        limit: 10,
        number: currentPage,
      },
    },
  });

  useEffect(() => {
    if (!!dataGetCourses?.courses?.items?.length) {
      setCourses(dataGetCourses?.courses?.items);
    }
  }, [dataGetCourses]);

  const onCourseCreated = useCallback((newCourse: AppCourseFragment) => {
    setCourses((currentCourses) => [...currentCourses, newCourse]);
  }, []);

  return (
    <AdminLayout>
      <Navbar />
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
            {courses?.length > 0 ? (
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
                <Button onClick={onOpenAddCourseDrawer}>
                  {translate.formatMessage({ id: "addCourse" })}
                </Button>
              </NotFound>
            )}
            <CoursesList courses={courses} />
            {dataGetCourses?.courses?.totalPages &&
              dataGetCourses?.courses?.totalPages > 1 && (
                <Pagination
                  marginTop="5"
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={!!dataGetCourses?.courses?.hasNextPage}
                  hasPreviousPage={!!dataGetCourses?.courses?.hasPreviousPage}
                  totalPages={dataGetCourses?.courses?.totalPages || 1}
                />
              )}
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
