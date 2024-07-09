import { useCurrentApp, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useUploadVideo } from "@/hooks/use-upload-video";
import { websiteRoutes } from "@stokei/routes";
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
  RichTextEditor,
  Stack,
  Title,
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
import { useGetAdminCoursePageModuleQuery } from "./graphql/module.query.graphql.generated";

export const AddVideoPage = () => {
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);
  const moduleId = useMemo(() => router?.query?.moduleId?.toString(), [router]);

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const [{ fetching: isLoadingModule, data: dataModule }] =
    useGetAdminCoursePageModuleQuery({
      variables: {
        moduleId: moduleId || "",
      },
    });

  const {
    onCreateVideo,
    isLoadingCreateVideo,
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

  useEffect(() => {
    register("description", { value: "" });
  }, [register]);

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
    const video = await onCreateVideo({
      parent: moduleId || "",
      name,
      description,
      duration: videoDuration,
      poster: posterId,
    });
    if (video) {
      goToModulesPage();
    }
  };

  const onUploadComplete = (data: VideoUploaderOnSuccessData) => {
    setVideoDuration(data?.duration || 0);
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
                        >
                          {translate.formatMessage({ id: "addVideo" })}
                        </Button>
                      )}
                      <VideoUploader
                        id="module-video"
                        uploadURL={videoUploadURL}
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
                          onChange={(value) => setValue("description", value)}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors?.description?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <ButtonGroup>
                      <Button
                        type="submit"
                        isLoading={isLoadingCreateVideo}
                        isDisabled={!isValid}
                      >
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
