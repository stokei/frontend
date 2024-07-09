import { useAPIErrors, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  RichTextEditor,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { useGetAdminSettingsCoursePageCourseQuery } from "./graphql/course.query.graphql.generated";
import { useAdminSettingsCoursePageUpdateCourseMutation } from "./graphql/update-course.mutation.graphql.generated";
import { Loading } from "./loading";

export const CourseSettingsPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const courseId = useMemo(
    () => router?.query?.courseId?.toString() || "",
    [router]
  );

  const [{ fetching: isLoadingUpdateCourse }, onExecuteUpdateCourse] =
    useAdminSettingsCoursePageUpdateCourseMutation();

  const [{ fetching: isLoadingCurrentCourse, data: dataCurrentCourse }] =
    useGetAdminSettingsCoursePageCourseQuery({
      pause: !courseId,
      variables: {
        courseId,
      },
    });

  const currentCourse = useMemo(
    () => dataCurrentCourse?.course,
    [dataCurrentCourse?.course]
  );

  const {
    imageId: avatarId,
    isLoadingStartUpload: isLoadingStartPosterUpload,
    onStartUpload: onStartPosterUpload,
    onCompleteUpload: onCompletePosterUpload,
    uploadURL: avatarUploadURL,
  } = useUploadImage();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const currentCourseName = watch("name");

  useEffect(() => {
    register("description", { value: "" });
  }, [register]);

  useEffect(() => {
    if (currentCourse) {
      reset({
        name: currentCourse?.name,
      });
    }
  }, [currentCourse, reset]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateCourse({
        input: {
          data: {
            name,
            description,
            ...(avatarId && { avatar: avatarId }),
          },
          where: {
            course: courseId,
          },
        },
      });
      if (!!response?.data?.updateCourse) {
        onShowToast({
          title: translate.formatMessage({ id: "courseUpdatedSuccessfully" }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        {isLoadingCurrentCourse ? (
          <Loading />
        ) : (
          <Card background="background.50">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing="5">
                  <Title fontSize="xl">{currentCourseName}</Title>
                  <FormControl>
                    <Label htmlFor="course-avatar">
                      {translate.formatMessage({ id: "image" })}
                    </Label>
                    {!avatarUploadURL && (
                      <Button
                        variant="outline"
                        onClick={onStartPosterUpload}
                        isLoading={isLoadingStartPosterUpload}
                        marginBottom="5"
                      >
                        {translate.formatMessage({
                          id: currentCourse?.avatar?.file?.url
                            ? "changeImage"
                            : "addImage",
                        })}
                      </Button>
                    )}
                    <ImageUploader
                      id="course-avatar"
                      uploadURL={avatarUploadURL}
                      previewURL={currentCourse?.avatar?.file?.url || ""}
                      onSuccess={onCompletePosterUpload}
                      onError={() => { }}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors?.name}>
                    <Label htmlFor="name">
                      {translate.formatMessage({ id: "name" })}
                    </Label>
                    <InputGroup>
                      <Input
                        id="name"
                        placeholder={translate.formatMessage({
                          id: "namePlaceholder",
                        })}
                        {...register("name")}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors?.description}>
                    <Label htmlFor="description">
                      {translate.formatMessage({ id: "description" })}
                    </Label>
                    <InputGroup>
                      <RichTextEditor
                        id="description"
                        defaultValue={currentCourse?.description || ""}
                        onChange={(value) => setValue("description", value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors?.description?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <ButtonGroup>
                    <Button type="submit" isLoading={isLoadingUpdateCourse}>
                      {translate.formatMessage({ id: "save" })}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        )}
      </Container>
    </CourseLayout>
  );
};
