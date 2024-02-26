import {
  Box,
  Button,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@stokei/ui";

import { AdminCoursePageCourseInstructorFragment } from "../../graphql/course-instructors.query.graphql.generated";
import { InstructorItem } from "../instructor-item";
import { useTranslations } from "@/hooks";
import { AddCourseInstructorDrawer } from "../add-course-instructor-drawer";

interface InstructorsListProps {
  courseId?: string;
  instructors?: AdminCoursePageCourseInstructorFragment[];
  onSuccessAddCourseInstructor: (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => void;
  onSuccessRemoveCourseInstructor: (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => void;
}

export const InstructorsList = ({
  courseId,
  instructors,
  onSuccessAddCourseInstructor,
  onSuccessRemoveCourseInstructor,
}: InstructorsListProps) => {
  const {
    isOpen: isOpenAddCourseInstructorDrawer,
    onClose: onCloseAddCourseInstructorDrawer,
    onOpen: onOpenAddCourseInstructorDrawer,
  } = useDisclosure();
  const translate = useTranslations();

  const onCourseInstructorAdded = (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => {
    onSuccessAddCourseInstructor(instructor);
    onCloseAddCourseInstructorDrawer();
  };
  return (
    <Stack direction="column" spacing="5">
      <AddCourseInstructorDrawer
        courseId={courseId}
        isOpenDrawer={isOpenAddCourseInstructorDrawer}
        onCloseDrawer={onCloseAddCourseInstructorDrawer}
        onSuccessAddCourseInstructor={onCourseInstructorAdded}
      />
      {!instructors?.length ? (
        <NotFound>
          <NotFoundIcon name="user" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "courseInstructorsNotFound" })}
          </NotFoundSubtitle>
          <Button onClick={onOpenAddCourseInstructorDrawer}>
            {translate.formatMessage({ id: "addCourseInstructor" })}
          </Button>
        </NotFound>
      ) : (
        <>
          <Box>
            <Button onClick={onOpenAddCourseInstructorDrawer}>
              {translate.formatMessage({ id: "addCourseInstructor" })}
            </Button>
          </Box>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
            {instructors?.map((instructor) => (
              <InstructorItem
                key={instructor?.id}
                courseId={courseId}
                instructor={instructor}
                onSuccessRemoveCourseInstructor={
                  onSuccessRemoveCourseInstructor
                }
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
};
