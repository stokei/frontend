import { useCustomersCourse, useTranslations } from "@/hooks";
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
import { FC } from "react";
import { Navbar } from "../../components/navbar";
import { CourseLayout } from "../../layout";
import { Loading } from "./loading";

interface CourseAboutPageProps {}

const CourseAboutPage: FC<CourseAboutPageProps> = () => {
  const translate = useTranslations();

  const { course, isLoadingCourse } = useCustomersCourse();

  return (
    <Container paddingY="5">
      {isLoadingCourse ? (
        <Loading />
      ) : (
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
      )}
    </Container>
  );
};

const CourseAboutPageWithLayout = () => (
  <CourseLayout>
    <Navbar />
    <CourseAboutPage />
  </CourseLayout>
);

export { CourseAboutPageWithLayout as CourseAboutPage };
