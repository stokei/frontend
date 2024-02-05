import { STOKEI_API_FILE_UPLOAD_URL } from "@/environments";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { useUploadImage } from "@/hooks/use-upload-image";
import { routes } from "@/routes";
import { AppLayout } from "@/views/app/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  FileUploader,
  Form,
  FormControl,
  FormErrorMessage,
  Icon,
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
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "./components/navbar";
import { useCreateCourseMaterialMutation } from "./graphql/create-material.mutation.graphql.generated";

interface AddMaterialPageProps {}

export const AddMaterialPage: FC<AddMaterialPageProps> = () => {
  const [fileId, setFileId] = useState<string>("");
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCreateMaterial }, onExecuteCreateMaterial] =
    useCreateCourseMaterialMutation();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
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

  const {
    imageId: imageId,
    isLoadingStartUpload: isLoadingStartImageUpload,
    onStartUpload: onStartImageUpload,
    onCompleteUpload: onCompleteImageUpload,
    uploadURL: imageUploadURL,
  } = useUploadImage();

  useEffect(() => {
    register("description", { value: "" });
  }, [register]);

  const goToMaterialsPage = () => {
    router.push(
      routes.app({ appId: currentApp?.id }).course({ course: courseId })
        .materials.home
    );
  };

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateMaterial({
        input: {
          parent: courseId || "",
          name,
          description,
          file: fileId,
          avatar: imageId,
          free: false,
        },
      });
      if (!!response?.data?.createMaterial) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });

        goToMaterialsPage();
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
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Box>
            <Button
              size="sm"
              variant="link"
              leftIcon={<Icon name="back" />}
              onClick={goToMaterialsPage}
            >
              {translate.formatMessage({ id: "back" })}
            </Button>
          </Box>
          <Card background="background.50">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing="5">
                  <Title fontSize="xl">
                    {translate.formatMessage({ id: "addMaterial" })}
                  </Title>
                  <FormControl>
                    <Label htmlFor="material-file">
                      {translate.formatMessage({ id: "file" })}
                    </Label>
                    <FileUploader
                      id="material-file"
                      uploadURL={STOKEI_API_FILE_UPLOAD_URL}
                      onSuccess={(result) => {
                        setFileId(result.file);
                      }}
                      onError={() => {}}
                    />
                  </FormControl>
                  <FormControl>
                    <Label htmlFor="material-image">
                      {translate.formatMessage({ id: "image" })}
                    </Label>
                    {!imageUploadURL && (
                      <Button
                        variant="outline"
                        onClick={onStartImageUpload}
                        isLoading={isLoadingStartImageUpload}
                      >
                        {translate.formatMessage({ id: "addImage" })}
                      </Button>
                    )}
                    <ImageUploader
                      id="material-image"
                      uploadURL={imageUploadURL}
                      onSuccess={onCompleteImageUpload}
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
                      isLoading={isLoadingCreateMaterial}
                      isDisabled={!isValid || !fileId}
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
    </AppLayout>
  );
};
