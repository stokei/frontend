import { useCustomersCourse, useTranslations } from "@/hooks";
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
import { FC } from "react";
import { CourseLayout } from "../../layout";
import { Navbar } from "../../components/navbar";

interface CourseVideoPageProps {}

const CourseVideoPage: FC<CourseVideoPageProps> = () => {
  const translate = useTranslations();

  const { course } = useCustomersCourse();

  return (
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
  );
};

const CourseVideoPageWithLayout = () => (
  <CourseLayout>
    <Navbar />
    <CourseVideoPage />
  </CourseLayout>
);

export { CourseVideoPageWithLayout as CourseVideoPage };
