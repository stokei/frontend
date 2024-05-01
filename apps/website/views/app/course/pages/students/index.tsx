import { usePagination, useTranslations } from "@/hooks";
import { Container, Pagination, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Navbar } from "./components/navbar";
import { StudentsList } from "./components/students-list";
import {
  AdminCoursePageCourseStudentFragment,
  useGetAdminCoursePageCourseStudentsQuery,
} from "./graphql/course-students.query.graphql.generated";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";

export const CourseStudentsPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ data: dataGetCourseStudents, fetching: isLoadingCourseStudents }] =
    useGetAdminCoursePageCourseStudentsQuery({
      pause: !courseId,
      variables: {
        page: {
          limit: 12,
          number: currentPage,
        },
        where: {
          AND: {
            course: {
              equals: courseId || "",
            },
          },
        },
      },
    });

  const courseStudents = useMemo(
    () => dataGetCourseStudents?.courseStudents,
    [dataGetCourseStudents]
  );
  const courseStudentAccounts = useMemo(
    () =>
      dataGetCourseStudents?.courseStudents?.items
        ?.map(({ student }) => student)
        .filter(Boolean) as AdminCoursePageCourseStudentFragment[],
    [dataGetCourseStudents]
  );

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          {courseStudents?.totalCount && courseStudents?.totalCount > 0 && (
            <Title fontSize="sm">
              {translate.formatMessage({ id: "total" })}:{" "}
              {courseStudents?.totalCount}
            </Title>
          )}
          {isLoadingCourseStudents ? (
            <Loading />
          ) : (
            <StudentsList students={courseStudentAccounts} />
          )}

          {courseStudents?.totalPages && courseStudents?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
              hasNextPage={!!courseStudents?.hasNextPage}
              hasPreviousPage={!!courseStudents?.hasPreviousPage}
              totalPages={courseStudents?.totalPages || 1}
            />
          )}
        </Stack>
      </Container>
    </CourseLayout>
  );
};
