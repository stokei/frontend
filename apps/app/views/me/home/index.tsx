import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { useUploadImage } from "@/hooks/use-upload-image";
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
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MeLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { useUpdateAccountMutation } from "./graphql/update-account.mutation.graphql.generated";

interface MeHomePageProps {}

export const MeHomePage: FC<MeHomePageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isLoadingUpdateAccount }, onUpdateAccount] =
    useUpdateAccountMutation();

  const validationSchema = z.object({
    firstname: z.string().min(1, {
      message: translate.formatMessage({ id: "firstnameIsRequired" }),
    }),
    lastname: z.string().min(1, {
      message: translate.formatMessage({ id: "lastnameIsRequired" }),
    }),
  });

  const {
    imageId,
    isLoadingStartUpload: isLoadingCreateImageUploadURL,
    onStartUpload: onStartImageUpload,
    onCompleteUpload: onCompleteImageUpload,
    uploadURL: imageUploadURL,
  } = useUploadImage();

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
                <Title fontSize="lg">
                  {translate.formatMessage({ id: "profile" })}
                </Title>
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
                    onSuccess={onCompleteImageUpload}
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
