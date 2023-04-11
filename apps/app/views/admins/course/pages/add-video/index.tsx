import {
  useAPIErrors,
  useCreateImageUploadURL,
  useCreateVideoUploadURL,
  useTranslations,
} from "@/hooks";
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
  Image,
  ImageUploader,
  Input,
  InputGroup,
  Label,
  Stack,
  Textarea,
  Title,
  VideoUploader,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { CourseLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { useGetAdminCoursePageModuleQuery } from "./graphql/module.query.graphql.generated";
import { Loading } from "../../loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateVideoMutation } from "./graphql/create-video.mutation.graphql.generated";
import { routes } from "@/routes";
import { useCreateImageMutation } from "./graphql/create-image.mutation.graphql.generated";

interface AddVideoPageProps {}
interface Poster {
  id: string;
  previewURL: string;
}

export const AddVideoPage: FC<AddVideoPageProps> = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [poster, setPoster] = useState<Poster>();

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
    reset,
    formState: { errors, isSubmitSuccessful },
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
          parent: moduleId || "",
          file: videoFileId,
          name,
          description,
          poster: poster?.id,
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
                      {poster?.previewURL && (
                        <Box marginBottom="5">
                          <Image
                            width="44"
                            height="fit-content"
                            src={poster?.previewURL}
                            alt={translate.formatMessage({ id: "poster" })}
                          />
                        </Box>
                      )}
                      {!posterUploadURL && (
                        <Button
                          variant="outline"
                          onClick={onStartPosterUpload}
                          isLoading={isLoadingCreatePosterUploadURL}
                        >
                          {translate.formatMessage({ id: "addPoster" })}
                        </Button>
                      )}
                      <ImageUploader
                        id="module-poster"
                        uploadURL={posterUploadURL}
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
                        >
                          {translate.formatMessage({ id: "addVideo" })}
                        </Button>
                      )}
                      <VideoUploader
                        id="module-video"
                        uploadURL={videoUploadURL}
                        onStartUpload={onStartVideoUpload}
                        onSuccess={() => {}}
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
                      <Button type="submit">
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
