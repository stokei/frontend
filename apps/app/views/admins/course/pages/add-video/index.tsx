import {
  useAPIErrors,
  useCreateVideoUploadURL,
  useTranslations,
} from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { routes } from "@/routes";
import { useCreateVideoMutation } from "@/services/graphql/mutations/create-video/create-video.mutation.graphql.generated";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  Highlight,
  Icon,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  Stack,
  Textarea,
  Title,
  VideoUploader,
  VideoUploaderOnSuccessData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";
import { Navbar } from "./components/navbar";
import { useGetAdminCoursePageModuleQuery } from "./graphql/module.query.graphql.generated";
import { useUploadVideo } from "@/hooks/use-upload-video";

interface AddVideoPageProps {}
interface Poster {
  id: string;
  previewURL: string;
}

export const AddVideoPage: FC<AddVideoPageProps> = () => {
  const [videoUploadIsCompleted, setVideoUploadIsCompleted] =
    useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const moduleId = useMemo(() => router?.query?.moduleId?.toString(), [router]);

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const [{ fetching: isLoadingModule, data: dataModule }] =
    useGetAdminCoursePageModuleQuery({
      variables: {
        moduleId: moduleId || "",
      },
    });

  const [{ fetching: isLoadingCreateVideo }, createVideo] =
    useCreateVideoMutation();

  const {
    fileId: videoFileId,
    isLoadingStartUpload: isLoadingStartVideoUpload,
    onStartUpload: onStartVideoUpload,
    onCompleteUpload: onCompleteVideoUpload,
    uploadURL: videoUploadURL,
  } = useUploadVideo();

  const {
    imageId: posterId,
    isLoadingStartUpload: isLoadingStartPosterUpload,
    onStartUpload: onStartPosterUpload,
    onCompleteUpload: onCompletePosterUpload,
    uploadURL: posterUploadURL,
  } = useUploadImage();

  const courseModule = useMemo(() => dataModule?.module, [dataModule]);
  const title = useMemo(
    () =>
      translate.formatMessage({ id: "addNewVideoToModule" }) +
        " " +
        courseModule?.name || "",
    [courseModule?.name, translate]
  );

  const goToModulesPage = () => {
    router.push(routes.admins.course({ course: courseId }).modules.home);
  };

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createVideo({
        input: {
          parent: moduleId || "",
          file: videoUploadIsCompleted ? videoFileId : null,
          name,
          description,
          duration: videoDuration,
          poster: posterId,
        },
      });
      if (!!response?.data?.createVideo) {
        onShowToast({
          title: translate.formatMessage({ id: "videoCreatedSuccessfully" }),
          status: "success",
        });
        goToModulesPage();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  const onUploadComplete = (data: VideoUploaderOnSuccessData) => {
    setVideoDuration(data?.duration || 0);
    setVideoUploadIsCompleted(true);
    onCompleteVideoUpload(data);
  };

  return (
    <CourseLayout>
      <Navbar />
      {isLoadingModule ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <Box>
              <Button
                size="sm"
                variant="link"
                leftIcon={<Icon name="back" />}
                onClick={goToModulesPage}
              >
                {translate.formatMessage({ id: "back" })}
              </Button>
            </Box>
            <Card background="background.50">
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="column" spacing="5">
                    <Title fontSize="xl">
                      <Highlight query={courseModule?.name || ""}>
                        {title}
                      </Highlight>
                    </Title>
                    <FormControl>
                      <Label htmlFor="module-poster">
                        {translate.formatMessage({ id: "poster" })}
                      </Label>
                      {!posterUploadURL && (
                        <Button
                          variant="outline"
                          onClick={onStartPosterUpload}
                          isLoading={isLoadingStartPosterUpload}
                        >
                          {translate.formatMessage({ id: "addPoster" })}
                        </Button>
                      )}
                      <ImageUploader
                        id="module-poster"
                        uploadURL={posterUploadURL}
                        onSuccess={onCompletePosterUpload}
                        onError={() => {}}
                      />
                    </FormControl>
                    <FormControl>
                      <Label htmlFor="module-video">
                        {translate.formatMessage({ id: "video" })}
                      </Label>

                      {!videoUploadURL && (
                        <Button
                          variant="outline"
                          onClick={onStartVideoUpload}
                          isLoading={isLoadingStartVideoUpload}
                        >
                          {translate.formatMessage({ id: "addVideo" })}
                        </Button>
                      )}
                      <VideoUploader
                        id="module-video"
                        uploadURL={videoUploadURL}
                        onStartUpload={onStartVideoUpload}
                        onSuccess={onUploadComplete}
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
                      <FormErrorMessage>
                        {errors?.name?.message}
                      </FormErrorMessage>
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
                      <Button type="submit" isLoading={isLoadingCreateVideo}>
                        {translate.formatMessage({ id: "add" })}
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Form>
              </CardBody>
            </Card>
          </Stack>
        </Container>
      )}
    </CourseLayout>
  );
};
