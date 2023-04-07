import { useTranslations } from "@/hooks";
import { getProductURL } from "@/utils";
import {
  Avatar,
  Box,
  Container,
  Description,
  Image,
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
            align="center"
          >
            <Image
              width="24"
              height="fit-content"
              rounded="sm"
              src={getProductURL(course?.avatar?.file?.url)}
              alt={translate.formatMessage({ id: "product" })}
            />
            <Stack direction="column" spacing="4">
              <Title fontSize="lg">{course?.name}</Title>
            </Stack>
          </Stack>

          <Box width="full" flexDirection="row">
            <Description>
              {course?.description ||
                translate.formatMessage({ id: "descriptionNotFound" })}
            </Description>
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
                    <Stack direction="row" spacing="5">
                      <Avatar
                        size="lg"
                        name={instructor?.fullname}
                        src={instructor?.avatar?.file?.url || ""}
                      />
                      <Stack direction="column" spacing="1">
                        <Title size="md" textAlign="center">
                          {instructor?.fullname}
                        </Title>
                        <Text justifyContent="center">{instructor?.email}</Text>
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
