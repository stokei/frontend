import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useUploadVideo } from "@/hooks/use-upload-video";
import { websiteRoutes } from "@stokei/routes";
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
  Highlight,
  Icon,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  RichTextEditor,
  Stack,
  Title,
  useDisclosure,
  useToast,
  VideoUploader,
  VideoUploaderOnSuccessData,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";
import { Navbar } from "./components/navbar";
import { RemoveVideoModal } from "./components/remove-video-modal";
import { useGetAdminCoursePageModuleEditVideoQuery } from "./graphql/module.query.graphql.generated";
import { useUpdateVideoMutation } from "./graphql/update-video.mutation.graphql.generated";
import { useGetAdminCoursePageEditVideoQuery } from "./graphql/video.query.graphql.generated";

interface Poster {
  id: string;
  previewURL: string;
}

export const EditVideoPage = () => {
  const [videoUploadIsCompleted, setVideoUploadIsCompleted] =
    useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const {
    isOpen: isOpenRemoveVideoModal,
    onClose: onCloseRemoveVideoModal,
    onOpen: onOpenRemoveVideoModal,
  } = useDisclosure();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const moduleId = useMemo(() => router?.query?.moduleId?.toString(), [router]);
  const videoId = useMemo(() => router?.query?.videoId?.toString(), [router]);

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    description: z.string().optional(),
  });

  const [{ data: dataModule }] = useGetAdminCoursePageModuleEditVideoQuery({
    variables: {
      moduleId: moduleId || "",
    },
  });
  const [{ fetching: isLoadingCurrentVideo, data: dataCurrentVideo }] =
    useGetAdminCoursePageEditVideoQuery({
      variables: {
        videoId: videoId || "",
      },
    });

  const [{ fetching: isLoadingCreateVideo }, onExecuteUpdateVideo] =
    useUpdateVideoMutation();

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
  const currentVideo = useMemo(
    () => dataCurrentVideo?.video,
    [dataCurrentVideo]
  );

  const title = useMemo(
    () =>
      translate.formatMessage({ id: "editVideoOfTheModule" }) +
      " " +
      courseModule?.name || "",
    [courseModule?.name, translate]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    register("description", { value: "" });
  }, [register]);

  useEffect(() => {
    if (currentVideo) {
      reset({
        name: currentVideo?.name || "",
        description: currentVideo?.description || "",
      });
      setVideoDuration(currentVideo?.file?.duration || 0);
    }
  }, [currentVideo, reset]);

  const goToModulesPage = () => {
    router.push(
      websiteRoutes.app({ appId: currentApp?.id }).course({ course: courseId })
        .modules.home
    );
  };

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateVideo({
        input: {
          data: {
            file: videoUploadIsCompleted ? videoFileId : null,
            name,
            description,
            duration: videoDuration,
            ...(posterId && { poster: posterId }),
          },
          where: {
            video: videoId || "",
          },
        },
      });
      if (!!response?.data?.updateVideo) {
        onShowToast({
          title: translate.formatMessage({ id: "videoUpdatedSuccessfully" }),
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
    } catch (error) { }
  };

  const onSuccessRemoveVideo = () => {
    onCloseRemoveVideoModal();
    goToModulesPage();
  };

  const onUploadComplete = (data: VideoUploaderOnSuccessData) => {
    setVideoDuration(data?.duration || 0);
    setVideoUploadIsCompleted(true);
    onCompleteVideoUpload(data);
  };

  return (
    <CourseLayout>
      <Navbar />
      {isLoadingCurrentVideo ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <RemoveVideoModal
            videoId={currentVideo?.id}
            isOpenModal={isOpenRemoveVideoModal}
            onCloseModal={onCloseRemoveVideoModal}
            onSuccessRemoveVideo={onSuccessRemoveVideo}
          />
          <Stack direction="column" spacing="5">
            <Stack direction="row" spacing="5" justify="space-between">
              <Button
                size="sm"
                variant="link"
                leftIcon={<Icon name="back" />}
                onClick={goToModulesPage}
              >
                {translate.formatMessage({ id: "back" })}
              </Button>
              <Button
                size="sm"
                variant="link"
                onClick={onOpenRemoveVideoModal}
                colorScheme="red"
              >
                {translate.formatMessage({ id: "removeVideo" })}
              </Button>
            </Stack>
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
                          marginBottom="5"
                        >
                          {translate.formatMessage({
                            id: currentVideo?.poster?.file?.url
                              ? "changeImage"
                              : "addPoster",
                          })}
                        </Button>
                      )}
                      <ImageUploader
                        id="module-poster"
                        uploadURL={posterUploadURL}
                        previewURL={currentVideo?.poster?.file?.url || ""}
                        onSuccess={onCompletePosterUpload}
                        onError={() => { }}
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
                          marginBottom="5"
                        >
                          {translate.formatMessage({
                            id: currentVideo?.file?.url
                              ? "changeVideo"
                              : "addVideo",
                          })}
                        </Button>
                      )}
                      <VideoUploader
                        id="module-video"
                        uploadURL={videoUploadURL}
                        preview={
                          currentVideo?.file
                            ? {
                              url: currentVideo?.file?.url || "",
                              filename: currentVideo?.file?.filename || "",
                            }
                            : undefined
                        }
                        onStartUpload={onStartVideoUpload}
                        onSuccess={onUploadComplete}
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
                      <FormErrorMessage>
                        {errors?.name?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors?.description}>
                      <Label htmlFor="description">
                        {translate.formatMessage({ id: "description" })}
                      </Label>
                      <InputGroup>
                        <RichTextEditor
                          id="description"
                          defaultValue={currentVideo?.description || ""}
                          onChange={(value) => setValue("description", value)}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors?.description?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <ButtonGroup>
                      <Button type="submit" isLoading={isLoadingCreateVideo}>
                        {translate.formatMessage({ id: "save" })}
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
