import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Stack,
  Text,
  Title,
  useDisclosure,
} from "@stokei/ui";

import { AdminCoursePageCourseInstructorFragment } from "../../graphql/course-instructors.query.graphql.generated";
import { RemoveCourseInstructorModal } from "../remove-course-instructor-modal";
import { useTranslations } from "@/hooks";

export interface InstructorItemProps {
  readonly courseId?: string;
  readonly instructor?: AdminCoursePageCourseInstructorFragment;
  onSuccessRemoveCourseInstructor: (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => void;
}

export const InstructorItem = ({
  courseId,
  instructor,
  onSuccessRemoveCourseInstructor,
}: InstructorItemProps) => {
  const translate = useTranslations();
  const {
    isOpen: isOpenRemoveCourseInstructorDrawer,
    onClose: onCloseRemoveCourseInstructorDrawer,
    onOpen: onOpenRemoveCourseInstructorDrawer,
  } = useDisclosure();

  const onRemoveCourseInstructor = (
    instructorRemoved: AdminCoursePageCourseInstructorFragment
  ) => {
    onSuccessRemoveCourseInstructor(instructorRemoved);
    onCloseRemoveCourseInstructorDrawer();
  };

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="column" spacing="5" align="center" justify="center">
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
          <RemoveCourseInstructorModal
            courseId={courseId}
            instructorId={instructor?.id}
            isOpenModal={isOpenRemoveCourseInstructorDrawer}
            onCloseModal={onCloseRemoveCourseInstructorDrawer}
            onSuccessRemoveCourseInstructor={onRemoveCourseInstructor}
          />
          <ButtonGroup
            width="full"
            variant="ghost"
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={onOpenRemoveCourseInstructorDrawer}>
              {translate.formatMessage({ id: "removeCourseInstructor" })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardHeader>
    </Card>
  );
};
