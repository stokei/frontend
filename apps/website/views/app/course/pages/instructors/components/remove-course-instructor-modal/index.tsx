import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
  useToast,
} from "@stokei/ui";

import { AdminCoursePageCourseInstructorFragment } from "../../graphql/course-instructors.query.graphql.generated";
import { useRemoveCourseInstructorMutation } from "../../graphql/remove-course-instructor.mutation.graphql.generated";

interface RemoveCourseInstructorModalProps {
  courseId?: string;
  instructorId?: string;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onSuccessRemoveCourseInstructor: (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => void;
}

export const RemoveCourseInstructorModal: FC<
  RemoveCourseInstructorModalProps
> = ({
  courseId,
  instructorId,
  isOpenModal,
  onCloseModal,
  onSuccessRemoveCourseInstructor,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [
    { fetching: isLoadingCreateCourseInstructor },
    removeCourseInstructor,
  ] = useRemoveCourseInstructorMutation();

  const onRemoveCourseInstructor = async () => {
    try {
      const response = await removeCourseInstructor({
        input: {
          where: {
            course: courseId || "",
            instructor: instructorId || "",
          },
        },
      });
      if (!!response?.data?.removeCourseInstructor) {
        onSuccessRemoveCourseInstructor(
          response?.data?.removeCourseInstructor?.instructor
        );
        onShowToast({
          title: translate.formatMessage({
            id: "courseInstructorRemovedSuccessfully",
          }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeCourseInstructor" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Text>
          {translate.formatMessage({
            id: "wouldYouReallyLikeToRemoveCourseInstructor",
          })}
        </Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingCreateCourseInstructor}
            onClick={onRemoveCourseInstructor}
          >
            {translate.formatMessage({ id: "removeCourseInstructor" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
