import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, memo } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { routes } from "@/routes";

export interface CourseItemProps {
  readonly course?: AppCourseFragment;
}

export const CourseItem: FC<CourseItemProps> = memo(({ course }) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
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
            <Stack spacing="5" flex="1" justify="flex-end">
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
              <Button
                width="full"
                onClick={() =>
                  router.push(routes.admins.course({ course: course?.id }).home)
                }
              >
                {translate.formatMessage({ id: "showDetails" })}
              </Button>
            </Stack>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
});
CourseItem.displayName = "CourseItem";
