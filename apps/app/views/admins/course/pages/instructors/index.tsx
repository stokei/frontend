import { usePagination } from "@/hooks";
import { Container, Pagination, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/navbar";
import { InstructorsList } from "./components/instructors-list";
import {
  AdminCoursePageCourseInstructorFragment,
  useGetAdminCoursePageCourseInstructorsQuery,
} from "./graphql/course-instructors.query.graphql.generated";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";

interface CourseInstructorsPageProps {}

export const CourseInstructorsPage: FC<CourseInstructorsPageProps> = () => {
  const [courseInstructorAccounts, setCourseInstructorAccounts] = useState<
    AdminCoursePageCourseInstructorFragment[]
  >([]);

  const router = useRouter();
  const { currentPage, onChangePage } = usePagination();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [
    { data: dataGetCourseInstructors, fetching: isLoadingCourseInstructors },
  ] = useGetAdminCoursePageCourseInstructorsQuery({
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

  const courseInstructors = useMemo(
    () => dataGetCourseInstructors?.courseInstructors,
    [dataGetCourseInstructors]
  );

  useEffect(() => {
    const instructors = dataGetCourseInstructors?.courseInstructors?.items?.map(
      ({ instructor }) => instructor
    );
    setCourseInstructorAccounts(instructors || []);
  }, [dataGetCourseInstructors?.courseInstructors?.items]);

  const addCourseInstructorAccount = (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => {
    setCourseInstructorAccounts((currentInstructors) => [
      ...currentInstructors,
      instructor,
    ]);
  };
  const removeCourseInstructorAccount = (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => {
    setCourseInstructorAccounts((currentInstructors) =>
      currentInstructors?.filter(
        (currentInstructor) => currentInstructor?.id !== instructor?.id
      )
    );
  };

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          {isLoadingCourseInstructors ? (
            <Loading />
          ) : (
            <InstructorsList
              courseId={courseId}
              instructors={courseInstructorAccounts}
              onSuccessAddCourseInstructor={addCourseInstructorAccount}
              onSuccessRemoveCourseInstructor={removeCourseInstructorAccount}
            />
          )}

          {courseInstructors?.totalPages &&
            courseInstructors?.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
                hasNextPage={!!courseInstructors?.hasNextPage}
                hasPreviousPage={!!courseInstructors?.hasPreviousPage}
                totalPages={courseInstructors?.totalPages || 1}
              />
            )}
        </Stack>
      </Container>
    </CourseLayout>
  );
};
