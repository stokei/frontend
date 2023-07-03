import { useAPIErrors, usePagination, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  Highlight,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  Pagination,
  Stack,
  Textarea,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useGetAdminSettingsCoursePageCourseQuery } from "./graphql/course.query.graphql.generated";
import { title } from "process";
import { useAdminSettingsCoursePageUpdateCourseMutation } from "./graphql/update-course.mutation.graphql.generated";

interface CourseSettingsPageProps {}

export const CourseSettingsPage: FC<CourseSettingsPageProps> = () => {
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
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const currentCourseName = watch("name");

  useEffect(() => {
    if (currentCourse) {
      reset({
        name: currentCourse?.name,
        description: currentCourse?.description || "",
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
    } catch (error) {}
  };

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
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
                    onError={() => {}}
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
                    <Textarea
                      id="description"
                      placeholder={translate.formatMessage({
                        id: "descriptionPlaceholder",
                      })}
                      {...register("description")}
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
      </Container>
    </CourseLayout>
  );
};
