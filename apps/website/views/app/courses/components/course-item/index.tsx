import NextLink from 'next/link';
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
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { AppCourseFragment } from "../../graphql/course.fragment.graphql.generated";

export interface CourseItemProps {
  readonly course?: AppCourseFragment;
}

export const CourseItem = ({ course }: CourseItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Link
      width="full"
      as={NextLink}
      href={websiteRoutes
        .app({ appId: currentApp?.id })
        .course({ course: course?.id }).home
      }
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
            <Title size="md">
              {course?.name}
            </Title>
            {!!course?.instructors?.items?.length && (
              <Box width="full" flexDirection="column" flex="1" marginTop="5">
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
              </Box>
            )}
          </Box>
        </CardBody>
      </Card>
    </Link>
  );
};
