import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useCallback, useEffect, useState } from "react";
import { AddCourseDrawer } from "./components/add-course-drawer";
import { CourseFilters } from "./components/course-filters";
import { CoursesList } from "./components/courses-list";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { AppCourseFragment } from "./graphql/course.fragment.graphql.generated";
import { useGetCoursesQuery } from "./graphql/courses.query.graphql.generated";
import { Loading } from "./loading";

export const CoursesPage = () => {
  const [courses, setCourses] = useState<AppCourseFragment[]>([]);
  const [filteredCourseQuery, setFilteredCourseQuery] = useState<string>();

  const {
    isOpen: isOpenAddCourseDrawer,
    onClose: onCloseAddCourseDrawer,
    onOpen: onOpenAddCourseDrawer,
  } = useDisclosure();

  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();

  const [{ data: dataGetCourses, fetching: isLoading }] = useGetCoursesQuery({
    requestPolicy: "network-only",
    variables: {
      where: {
        AND: {
          parent: {
            equals: currentApp?.id,
          },
          ...(filteredCourseQuery && {
            name: {
              startsWith: filteredCourseQuery,
            },
          }),
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
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <AddCourseDrawer
          isOpenDrawer={isOpenAddCourseDrawer}
          onCloseDrawer={onCloseAddCourseDrawer}
          onSuccess={onCourseCreated}
        />
        <CourseFilters
          isOpen={isOpenFiltersDrawer}
          onClose={onToggleFiltersDrawer}
          filteredCourseQuery={filteredCourseQuery}
          onChangeFilteredCourseQuery={setFilteredCourseQuery}
        />
        <Container>
          <Header
            coursesTotalCount={dataGetCourses?.courses?.totalCount || 0}
            onOpenFilters={onToggleFiltersDrawer}
            onOpenAddCourse={onOpenAddCourseDrawer}
          />
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {courses?.length > 0 ? (
              <Container>
                <CoursesList courses={courses} />
              </Container>
            ) : (
              <Container>
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
                </NotFound>
              </Container>
            )}
            <Container>
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
          </>
        )}
      </Stack>
    </AppLayout>
  );
};
