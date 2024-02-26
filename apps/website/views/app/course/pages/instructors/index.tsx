import { usePagination, useTranslations } from "@/hooks";
import { Container, Pagination, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/navbar";
import { InstructorsList } from "./components/instructors-list";
import {
  AdminCoursePageCourseInstructorFragment,
  useGetAdminCoursePageCourseInstructorsQuery,
} from "./graphql/course-instructors.query.graphql.generated";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";

export const CourseInstructorsPage = () => {
  const [courseInstructorAccounts, setCourseInstructorAccounts] = useState<
    AdminCoursePageCourseInstructorFragment[]
  >([]);

  const router = useRouter();
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [
    { data: dataGetCourseInstructors, fetching: isLoadingCourseInstructors },
  ] = useGetAdminCoursePageCourseInstructorsQuery({
    pause: !courseId,
    requestPolicy: "network-only",
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
          {courseInstructors?.totalCount &&
            courseInstructors?.totalCount > 0 && (
              <Title fontSize="sm">
                {translate.formatMessage({ id: "total" })}:{" "}
                {courseInstructors?.totalCount}
              </Title>
            )}

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
