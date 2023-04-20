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
import { MeLayout } from "../layout";
import { Navbar } from "./components/navbar";
import {
  useAPIErrors,
  useCreateImageUploadURL,
  useTranslations,
} from "@/hooks";
import { useUpdateAccountMutation } from "./graphql/update-account.mutation.graphql.generated";
import { useRouter } from "next/router";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { useCreateImageMutation } from "@/services/graphql/mutations/create-image/create-image.mutation.graphql.generated";

interface MeHomePageProps {}

export const MeHomePage: FC<MeHomePageProps> = () => {
  const [imageId, setImageId] = useState<string>();
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isLoadingUpdateAccount }, onUpdateAccount] =
    useUpdateAccountMutation();
  const [{ fetching: isLoadingCreateImage }, createImage] =
    useCreateImageMutation();

  const validationSchema = z.object({
    firstname: z.string().min(1, {
      message: translate.formatMessage({ id: "firstnameIsRequired" }),
    }),
    lastname: z.string().min(1, {
      message: translate.formatMessage({ id: "lastnameIsRequired" }),
    }),
  });

  const {
    fileId: imageFileId,
    isLoading: isLoadingCreateImageUploadURL,
    onStartUpload: onStartImageUpload,
    uploadURL: imageUploadURL,
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
    if (currentAccount) {
      reset({
        firstname: currentAccount?.firstname || "",
        lastname: currentAccount?.lastname || "",
      });
    }
  }, [currentAccount, reset]);

  const onCreateImageImage = useCallback(async () => {
    try {
      const response = await createImage({
        input: { file: imageFileId || "" },
      });
      if (!!response.data?.createImage?.id) {
        setImageId(response.data?.createImage.id);
        return;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [createImage, onShowAPIError, imageFileId]);

  const onSubmit = async ({
    firstname,
    lastname,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdateAccount({
        input: {
          data: {
            firstname,
            lastname,
            avatar: imageId,
          },
        },
      });
      if (!!response?.data?.updateAccount) {
        onShowToast({
          title: translate.formatMessage({ id: "accountUpdatedSuccessfully" }),
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
    <MeLayout>
      <Navbar />
      <Container display="flex" padding="5" align="center" justify="center">
        <Card
          width={["full", "full", "500px", "500px"]}
          background="background.50"
        >
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing="5">
                <FormControl isInvalid={!!errors?.firstname}>
                  <Label htmlFor="firstname">
                    {translate.formatMessage({ id: "firstname" })}
                  </Label>
                  <InputGroup>
                    <Input
                      id="firstname"
                      placeholder={translate.formatMessage({
                        id: "firstnamePlaceholder",
                      })}
                      {...register("firstname")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.firstname?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.lastname}>
                  <Label htmlFor="lastname">
                    {translate.formatMessage({ id: "lastname" })}
                  </Label>
                  <InputGroup>
                    <Input
                      id="lastname"
                      placeholder={translate.formatMessage({
                        id: "lastnamePlaceholder",
                      })}
                      {...register("lastname")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.lastname?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <Label htmlFor="account-image">
                    {translate.formatMessage({ id: "image" })}
                  </Label>
                  {!imageUploadURL && (
                    <Button
                      variant="outline"
                      onClick={onStartImageUpload}
                      isLoading={isLoadingCreateImageUploadURL}
                      marginBottom="5"
                    >
                      {translate.formatMessage({ id: "addImage" })}
                    </Button>
                  )}
                  <ImageUploader
                    id="account-image"
                    uploadURL={imageUploadURL}
                    previewURL={currentAccount?.avatar?.file?.url || ""}
                    onSuccess={onCreateImageImage}
                    onError={() => {}}
                  />
                </FormControl>
                <ButtonGroup>
                  <Button
                    width="full"
                    type="submit"
                    isLoading={isLoadingUpdateAccount}
                  >
                    {translate.formatMessage({ id: "save" })}
                  </Button>
                </ButtonGroup>
              </Stack>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </MeLayout>
  );
};
