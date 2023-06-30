import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
  useToast,
} from "@stokei/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { useCreateCourseMutation } from "../../graphql/create-course.mutation.graphql.generated";
import { useRouter } from "next/router";

export interface FormAddCourseOnSubmitData {
  name: string;
}

interface AddCourseDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (course: AppCourseFragment) => void;
}

export const AddCourseDrawer: FC<AddCourseDrawerProps> = ({
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "courseNameIsRequired" }),
    }),
  });

  const [{ fetching: isLoadingCreateCourse }, createCourse] =
    useCreateCourseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({ name }: FormAddCourseOnSubmitData) => {
    try {
      const response = await createCourse({
        input: {
          parent: currentApp?.id || "",
          name,
        },
      });
      if (!!response?.data?.createCourse) {
        onShowToast({
          title: translate.formatMessage({ id: "courseCreatedSuccessfully" }),
          status: "success",
        });
        router.push(
          routes.app({ appId: currentApp?.id }).course({
            course: response?.data?.createCourse?.id,
          }).home
        );
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
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addCourse" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "courseName" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  type="name"
                  placeholder={translate.formatMessage({
                    id: "courseNamePlaceholder",
                  })}
                  {...register("name")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isLoadingCreateCourse}>
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
