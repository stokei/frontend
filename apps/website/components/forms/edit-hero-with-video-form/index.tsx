import { useAPIErrors, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormErrorMessage,
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditHeroWithVideoFormUpdateHeroMutation } from "./graphql/update-hero.mutation.graphql.generated";
import { useUploadVideo } from "@/hooks/use-upload-video";
import { useCreateVideoMutation } from "@/services/graphql/mutations/create-video/create-video.mutation.graphql.generated";

interface EditHeroWithVideoFormHeroVideoFile {
  url?: string;
  filename?: string;
}
interface EditHeroWithVideoFormHero {
  id: string;
  title: string;
  subtitle: string;
  videoFile?: EditHeroWithVideoFormHeroVideoFile;
}

interface EditHeroWithVideoFormProps {
  readonly hero: EditHeroWithVideoFormHero;
}

export const EditHeroWithVideoForm = ({ hero }: EditHeroWithVideoFormProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateHero }, onExecuteUpdateHero] =
    useEditHeroWithVideoFormUpdateHeroMutation();

  const {
    videoId,
    onCreateVideo,
    isLoadingStartUpload: isLoadingStartVideoUpload,
    onStartUpload: onStartVideoUpload,
    onCompleteUpload: onCompleteVideoUpload,
    uploadURL: videoUploadURL,
  } = useUploadVideo();

  const validationSchema = z.object({
    title: z.string().min(1, {
      message: translate.formatMessage({ id: "titleIsRequired" }),
    }),
    subtitle: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const title = watch("title");

  useEffect(() => {
    if (hero) {
      reset({
        title: hero?.title || "",
        subtitle: hero?.subtitle || "",
      });
    }
  }, [hero, reset]);

  const onSubmit = async ({
    title,
    subtitle,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateHero({
        input: {
          data: {
            title,
            subtitle,
            video: videoId,
          },
          where: {
            hero: hero?.id || "",
          },
        },
      });
      if (!!response?.data?.updateHero) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
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

  const onUploadComplete = async (data: VideoUploaderOnSuccessData) => {
    await onCompleteVideoUpload(data);
    await onCreateVideo({
      parent: hero.id,
      name: title,
      duration: data.duration || 0,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="5">
        <Title fontSize="xl">
          {translate.formatMessage({ id: "editHero" })}
        </Title>
        <FormControl isInvalid={!!errors?.title}>
          <Label htmlFor="title">
            {translate.formatMessage({ id: "title" })}
          </Label>
          <InputGroup>
            <Input
              id="title"
              placeholder={translate.formatMessage({
                id: "title",
              })}
              {...register("title")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.subtitle}>
          <Label htmlFor="subtitle">
            {translate.formatMessage({ id: "subtitle" })}
          </Label>
          <InputGroup>
            <Textarea
              id="subtitle"
              placeholder={translate.formatMessage({
                id: "subtitle",
              })}
              {...register("subtitle")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.subtitle?.message}</FormErrorMessage>
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
                id: !!hero?.videoFile ? "changeVideo" : "addVideo",
              })}
            </Button>
          )}
          <VideoUploader
            id="module-video"
            uploadURL={videoUploadURL}
            preview={hero?.videoFile}
            onStartUpload={onStartVideoUpload}
            onSuccess={onUploadComplete}
            onError={() => {}}
          />
        </FormControl>
        <ButtonGroup>
          <Button type="submit" isLoading={isLoadingUpdateHero}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
