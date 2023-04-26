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
  Stack,
  Title,
  VideoUploader,
  useToast,
} from "@stokei/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsLayout } from "../layout";
import { Navbar } from "./components/navbar";
import {
  useAPIErrors,
  useCreateImageUploadURL,
  useTranslations,
} from "@/hooks";
import { useUpdateAppMutation } from "./graphql/update-app.mutation.graphql.generated";
import { useRouter } from "next/router";
import { useCurrentApp } from "@/hooks/use-current-app";
import { useCreateImageMutation } from "@/services/graphql/mutations/create-image/create-image.mutation.graphql.generated";

interface SettingsHomePageProps {}

export const SettingsHomePage: FC<SettingsHomePageProps> = () => {
  const [logoId, setLogoId] = useState<string>();
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();

  const [{ fetching: isLoadingUpdateApp }, onUpdateApp] =
    useUpdateAppMutation();
  const [{ fetching: isLoadingCreateImage }, createImage] =
    useCreateImageMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
  });

  const {
    fileId: logoFileId,
    isLoading: isLoadingCreateLogoUploadURL,
    onStartUpload: onStartLogoUpload,
    uploadURL: logoUploadURL,
  } = useCreateImageUploadURL();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (currentApp) {
      reset({
        name: currentApp?.name || "",
      });
    }
  }, [currentApp, reset]);

  const onCreateImageImage = useCallback(async () => {
    try {
      const response = await createImage({
        input: { file: logoFileId || "" },
      });
      if (!!response.data?.createImage?.id) {
        setLogoId(response.data?.createImage.id);
        return;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [createImage, onShowAPIError, logoFileId]);

  const onSubmit = async ({ name }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdateApp({
        input: {
          data: {
            name,
            logo: logoId,
          },
        },
      });
      if (!!response?.data?.updateApp) {
        onShowToast({
          title: translate.formatMessage({ id: "appUpdatedSuccessfully" }),
          status: "success",
        });
        router.reload();
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
    <SettingsLayout>
      <Navbar />
      <Container paddingY="5">
        <Card background="background.50">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing="5">
                <Title fontSize="lg">
                  {translate.formatMessage({ id: "profile" })}
                </Title>
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
                <FormControl>
                  <Label htmlFor="app-image">
                    {translate.formatMessage({ id: "logo" })}
                  </Label>
                  {!logoUploadURL && (
                    <Button
                      variant="outline"
                      onClick={onStartLogoUpload}
                      isLoading={isLoadingCreateLogoUploadURL}
                      marginBottom="5"
                    >
                      {translate.formatMessage({ id: "addLogo" })}
                    </Button>
                  )}
                  <ImageUploader
                    id="app-logo"
                    uploadURL={logoUploadURL}
                    previewURL={currentApp?.logo?.file?.url || ""}
                    onSuccess={onCreateImageImage}
                    onError={() => {}}
                  />
                </FormControl>
                <ButtonGroup justifyContent="flex-end">
                  <Button type="submit" isLoading={isLoadingUpdateApp}>
                    {translate.formatMessage({ id: "save" })}
                  </Button>
                </ButtonGroup>
              </Stack>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </SettingsLayout>
  );
};
