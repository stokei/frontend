import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import {
  Box,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  NotFoundTitle,
  Pagination,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { CustomerLayout } from "../layout";
import { CoursesList } from "./components/courses-list";
import { Navbar } from "./components/navbar";
import { useGetCustomersCoursePageCourseQuery } from "./graphql/courses.query.graphql.generated";
import { Loading } from "./loading";
import { useCurrentAccount } from "@/hooks/use-current-account";

interface CoursesPageProps {}

export const CoursesPage: FC<CoursesPageProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const { currentPage, onChangePage } = usePagination();

  const [{ data: dataGetCourses, fetching: isLoading }] =
    useGetCustomersCoursePageCourseQuery({
      requestPolicy: "network-only",
      variables: {
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            student: {
              equals: currentAccount?.id,
            },
          },
        },
        page: {
          limit: 10,
          number: currentPage,
        },
      },
    });

  const courses = useMemo(
    () => dataGetCourses?.courseStudents?.items || [],
    [dataGetCourses]
  );

  return (
    <CustomerLayout>
      <Navbar />
      <Box width="full" flexDirection="row">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            {courses?.length > 0 ? (
              <CoursesList courses={courses} />
            ) : (
              <NotFound>
                <NotFoundIcon name="course" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "coursesNotFound" })}
                </NotFoundSubtitle>
              </NotFound>
            )}
            {dataGetCourses?.courseStudents?.totalPages &&
              dataGetCourses?.courseStudents?.totalPages > 1 && (
                <Pagination
                  marginTop="5"
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={!!dataGetCourses?.courseStudents?.hasNextPage}
                  hasPreviousPage={
                    !!dataGetCourses?.courseStudents?.hasPreviousPage
                  }
                  totalPages={dataGetCourses?.courseStudents?.totalPages || 1}
                />
              )}
          </Container>
        )}
      </Box>
    </CustomerLayout>
  );
};
