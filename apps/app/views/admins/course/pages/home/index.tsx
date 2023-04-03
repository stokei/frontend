import { useTranslations } from "@/hooks";
import { CourseLayout } from "../../layout";
import { Box, Container, Description, Image, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { Navbar } from "../../components/navbar";
import { useRouter } from "next/router";
import { useGetAdminCoursePageCourseQuery } from "../../graphql/course.query.graphql.generated";
import { getProductURL } from "@/utils";

interface CoursePageProps {}

export const CoursePage: FC<CoursePageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ data: dataGetCourse, fetching: isLoadingCourse }] =
    useGetAdminCoursePageCourseQuery({
      pause: !courseId,
      variables: {
        courseId: courseId || "",
      },
    });

  const course = useMemo(() => dataGetCourse?.course, [dataGetCourse]);

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction={["column", "column", "row", "row"]} align="center">
          <Image
            width="16"
            height="fit-content"
            rounded="sm"
            src={getProductURL(course?.avatar?.file?.url)}
            alt={translate.formatMessage({ id: "product" })}
          />
          <Stack direction="column" spacing="4">
            <Text fontWeight="bold">{course?.name}</Text>
          </Stack>
        </Stack>
        {course?.description && (
          <Box width="full" flexDirection="row">
            <Description>{course?.description}</Description>
          </Box>
        )}
      </Container>
    </CourseLayout>
  );
};
