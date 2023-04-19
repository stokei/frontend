import {
  useAPIErrors,
  useCreateImageUploadURL,
  useCreateVideoUploadURL,
  useTranslations,
} from "@/hooks";
import { routes } from "@/routes";
import { useCreateImageMutation } from "@/services/graphql/mutations/create-image/create-image.mutation.graphql.generated";
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
  Stack,
  Textarea,
  Title,
  VideoUploader,
  useDisclosure,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseLayout } from "../../layout";
import { Loading } from "../../loading";
import { Navbar } from "./components/navbar";
import { RemoveVideoModal } from "./components/remove-video-modal";
import { useGetAdminCoursePageModuleEditVideoQuery } from "./graphql/module.query.graphql.generated";
import { useUpdateVideoMutation } from "./graphql/update-video.mutation.graphql.generated";
import { useGetAdminCoursePageEditVideoQuery } from "./graphql/video.query.graphql.generated";

interface EditVideoPageProps {}
interface Poster {
  id: string;
  previewURL: string;
}

export const EditVideoPage: FC<EditVideoPageProps> = () => {
  const [videoUploadIsCompleted, setVideoUploadIsCompleted] =
    useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [poster, setPoster] = useState<Poster>();

  const router = useRouter();
  const translate = useTranslations();
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
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const [{ fetching: isLoadingModule, data: dataModule }] =
    useGetAdminCoursePageModuleEditVideoQuery({
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

  const [{ fetching: isLoadingCreateVideo }, createVideo] =
    useUpdateVideoMutation();

  const [{ fetching: isLoadingCreateImage }, createImage] =
    useCreateImageMutation();

  const {
    fileId: videoFileId,
    isLoading: isLoadingCreateVideoUploadURL,
    onStartUpload: onStartVideoUpload,
    uploadURL: videoUploadURL,
  } = useCreateVideoUploadURL();

  const {
    fileId: posterFileId,
    isLoading: isLoadingCreatePosterUploadURL,
    onStartUpload: onStartPosterUpload,
    uploadURL: posterUploadURL,
  } = useCreateImageUploadURL();

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
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (currentVideo) {
      reset({
        name: currentVideo?.name || "",
        description: currentVideo?.description || "",
      });
    }
  }, [currentVideo, reset]);

  const goToModulesPage = () => {
    router.push(routes.admins.course({ course: courseId }).modules.home);
  };
  const onCreatePosterImage = useCallback(async () => {
    try {
      const response = await createImage({
        input: { file: posterFileId || "" },
      });
      if (!!response.data?.createImage?.id) {
        setPoster({
          id: response.data?.createImage.id,
          previewURL: response.data?.createImage?.file?.url || "",
        });
        return;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [createImage, onShowAPIError, posterFileId]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createVideo({
        input: {
          data: {
            file: videoUploadIsCompleted ? videoFileId : null,
            name,
            description,
            duration: videoDuration,
            poster: poster?.id,
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
    } catch (error) {}
  };

  const onSuccessRemoveVideo = () => {
    onCloseRemoveVideoModal();
    goToModulesPage();
  };

  const onUploadComplete = ({ duration }: { duration?: number }) => {
    setVideoDuration(duration || 0);
    setVideoUploadIsCompleted(true);
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
                          isLoading={isLoadingCreatePosterUploadURL}
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
                        onSuccess={onCreatePosterImage}
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
                          isLoading={isLoadingCreateVideoUploadURL}
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
                        previewURL={currentVideo?.file?.url || ""}
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
