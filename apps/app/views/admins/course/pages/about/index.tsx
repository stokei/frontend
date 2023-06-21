import { useTranslations } from "@/hooks";
import { getProductURL } from "@/utils";
import {
  Avatar,
  Box,
  Container,
  Description,
  Image,
  Markdown,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { useGetAdminCoursePageCourseQuery } from "./graphql/course.query.graphql.generated";
import { CourseLayout } from "../../layout";

interface CourseAboutPageProps {}

export const CourseAboutPage: FC<CourseAboutPageProps> = () => {
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
        <Stack direction="column" spacing="5">
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="5"
            align={["flex-start", "flex-start", "center", "center"]}
          >
            <Image
              width="24"
              rounded="sm"
              src={getProductURL(course?.avatar?.file?.url)}
              alt={translate.formatMessage({ id: "product" })}
            />
            <Stack direction="column" spacing="4">
              <Title fontSize="lg">{course?.name}</Title>
            </Stack>
          </Stack>

          <Box width="full" flexDirection="row">
            <Markdown
              text={
                course?.description ||
                translate.formatMessage({ id: "descriptionNotFound" })
              }
            />
          </Box>

          <Stack direction="column" spacing="5">
            <Title fontSize="md">
              {translate.formatMessage({ id: "instructors" })}
            </Title>
            <Stack direction="column" spacing="5">
              {!course?.instructors?.totalCount ? (
                <Description>
                  {translate.formatMessage({ id: "courseInstructorsNotFound" })}
                </Description>
              ) : (
                <>
                  {course?.instructors?.items?.map(({ instructor }) => (
                    <Stack
                      key={instructor.id}
                      direction="row"
                      spacing="5"
                      align="center"
                    >
                      <Avatar
                        size="md"
                        name={instructor?.fullname}
                        src={instructor?.avatar?.file?.url || ""}
                      />
                      <Stack direction="column" spacing="0">
                        <Title fontSize="sm">{instructor?.fullname}</Title>
                        <Text fontSize="sm">{instructor?.email}</Text>
                      </Stack>
                    </Stack>
                  ))}
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </CourseLayout>
  );
};
