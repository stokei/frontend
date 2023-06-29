import { usePagination } from "@/hooks";
import { Container, Pagination, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { StudentsList } from "./components/students-list";
import { useGetAdminCoursePageCourseStudentsQuery } from "./graphql/course-students.query.graphql.generated";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";

interface CourseStudentsPageProps {}

export const CourseStudentsPage: FC<CourseStudentsPageProps> = () => {
  const router = useRouter();
  const { currentPage, onChangePage } = usePagination();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ data: dataGetCourseStudents, fetching: isLoadingCourseStudents }] =
    useGetAdminCoursePageCourseStudentsQuery({
      pause: !courseId,
      variables: {
        page: {
          limit: 10,
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
      dataGetCourseStudents?.courseStudents?.items?.map(
        ({ student }) => student
      ),
    [dataGetCourseStudents]
  );

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
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
