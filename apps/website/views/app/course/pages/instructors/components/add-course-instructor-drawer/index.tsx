import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  Stack,
  useToast,
} from "@stokei/ui";
import { useCallback, useState } from "react";
import { useCreateCourseInstructorMutation } from "../../graphql/create-course-instructor.mutation.graphql.generated";
import { AdminCoursePageCourseInstructorFragment } from "../../graphql/course-instructors.query.graphql.generated";

export interface FormAddCourseInstructorOnSubmitData {
  instructor?: string;
}

interface AddCourseInstructorDrawerProps {
  courseId?: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccessAddCourseInstructor: (
    instructor: AdminCoursePageCourseInstructorFragment
  ) => void;
}

export const AddCourseInstructorDrawer = ({
  courseId,
  isOpenDrawer,
  onCloseDrawer,
  onSuccessAddCourseInstructor,
}: AddCourseInstructorDrawerProps) => {
  const [instructors, setInstructors] = useState<AppAccountFragment[]>([]);
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [
    { fetching: isLoadingCreateCourseInstructor },
    createCourseInstructor,
  ] = useCreateCourseInstructorMutation();

  const onAddCourseInstructor = async ({
    instructor,
  }: {
    instructor: AppAccountFragment;
  }) => {
    try {
      const response = await createCourseInstructor({
        input: {
          course: courseId || "",
          instructor: instructor?.id || "",
        },
      });
      if (!!response?.data?.createCourseInstructor) {
        onSuccessAddCourseInstructor(
          response?.data?.createCourseInstructor?.instructor
        );
        setInstructors([]);
        onShowToast({
          title: translate.formatMessage({
            id: "courseInstructorCreatedSuccessfully",
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

  const onAddCourseInstructors = async () => {
    return instructors?.map((instructor) =>
      onAddCourseInstructor({ instructor })
    );
  };

  const onChooseInstructor = useCallback((instructor?: AppAccountFragment) => {
    if (instructor) {
      setInstructors((instructors) => [...instructors, instructor]);
    }
  }, []);
  const onRemoveChooseInstructor = useCallback(
    (instructorRemoved?: AppAccountFragment) => {
      if (instructorRemoved) {
        setInstructors((instructors) =>
          instructors?.filter(
            (instructor) => instructor?.id !== instructorRemoved?.id
          )
        );
      }
    },
    []
  );

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addCourseInstructor" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={onAddCourseInstructors}>
          <Stack direction="column" spacing="5">
            <SelectMembers
              label={translate.formatMessage({ id: "instructor" })}
              currentMembers={instructors}
              onChooseCurrentMember={onChooseInstructor}
              onRemoveChooseCurrentMember={onRemoveChooseInstructor}
            />
            <Button
              type="submit"
              isDisabled={!instructors?.length}
              isLoading={isLoadingCreateCourseInstructor}
            >
              {translate.formatMessage({
                id: "save",
              })}
            </Button>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
