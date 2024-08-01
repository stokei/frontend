import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Title
} from "@stokei/ui";

import defaultNoImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { CustomersCoursePageCourseFragment } from "../../graphql/courses.query.graphql.generated";

export interface CourseItemProps {
  readonly course?: CustomersCoursePageCourseFragment;
}

export const CourseItem = ({ course }: CourseItemProps) => {
  const translate = useTranslations();

  return (
    <Link
      width="full"
      height="full"
      href={appRoutes.customers.course({ course: course?.id }).home}
    >
      <Card background="background.50" overflow="hidden">
        <CardHeader position="relative" padding="0">
          <Image
            width="full"
            src={course?.avatar?.file?.url || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "course" })}
          />
        </CardHeader>
        <CardBody>
          <Box width="full" flexDirection="column" height="full">
            <Title size="md" marginBottom="5">
              {course?.name}
            </Title>
            <Box width="full" flexDirection="column" flex="1">
              {!!course?.instructors?.items?.length && (
                <AvatarGroup>
                  {course?.instructors?.items?.map(({ instructor }) => (
                    <Avatar
                      key={instructor?.id}
                      size="sm"
                      name={instructor?.fullname}
                      src={instructor?.avatar?.file?.url || ""}
                    />
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Link>
  );
};
