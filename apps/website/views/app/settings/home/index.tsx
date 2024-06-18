import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentApp } from "@/hooks/use-current-app";
import { useUploadImage } from "@/hooks/use-upload-image";
import { AppLayout } from "@/views/app/layout";
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
  Stack,
  Title,
  useToast
} from "@stokei/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "./components/navbar";
import { useUpdateAppMutation } from "./graphql/update-app.mutation.graphql.generated";

export const HomePage = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp, onReloadCurrentApp } = useCurrentApp();

  const [{ fetching: isLoadingUpdateApp }, onUpdateApp] =
    useUpdateAppMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    email: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "required" }) })
      .email({
        message: translate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
  });

  const {
    imageId: logoId,
    isLoadingStartUpload: isLoadingStartLogoUpload,
    onStartUpload: onStartLogoUpload,
    onCompleteUpload: onCompleteLogoUpload,
    uploadURL: logoUploadURL,
  } = useUploadImage();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (currentApp) {
      reset({
        name: currentApp?.name || "",
        email: currentApp?.email || "",
      });
    }
  }, [currentApp, reset]);

  const onSubmit = async ({ name, email }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdateApp({
        input: {
          data: {
            name,
            email,
            logo: logoId,
          },
        },
      });
      if (!!response?.data?.updateApp) {
        await onReloadCurrentApp();
        return onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Card background="background.50">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing="5">
                <Title fontSize="lg">
                  {translate.formatMessage({ id: "informations" })}
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
                <FormControl isInvalid={!!errors?.email}>
                  <Label htmlFor="email">
                    {translate.formatMessage({ id: "email" })}
                  </Label>
                  <InputGroup>
                    <Input
                      id="email"
                      type="email"
                      placeholder={translate.formatMessage({
                        id: "emailPlaceholder",
                      })}
                      {...register("email")}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <Label htmlFor="app-image">
                    {translate.formatMessage({ id: "logo" })}
                  </Label>
                  {!logoUploadURL && (
                    <Button
                      variant="outline"
                      onClick={onStartLogoUpload}
                      isLoading={isLoadingStartLogoUpload}
                      marginBottom="5"
                    >
                      {translate.formatMessage({ id: "addLogo" })}
                    </Button>
                  )}
                  <ImageUploader
                    id="app-logo"
                    uploadURL={logoUploadURL}
                    previewURL={currentApp?.logo?.file?.url || ""}
                    onSuccess={onCompleteLogoUpload}
                    onError={() => { }}
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
    </AppLayout>
  );
};
