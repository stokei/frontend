import { useAPIErrors, useTranslations } from "@/hooks";
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
  Loading,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { useMemberPageGetMemberQuery } from "./graphql/member.query.graphql.generated";
import { useMemberPageUpdateAccountMutation } from "./graphql/update-account.mutation.graphql.generated";

interface MemberPageProps {}

export const MemberPage: FC<MemberPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const account = router.query.member || "";

  const [{ fetching: isLoadingMember, data: dataMember }] =
    useMemberPageGetMemberQuery({
      requestPolicy: "network-only",
      variables: {
        id: account + "",
      },
    });
  const [{ fetching: isLoadingUpdateAccount }, onUpdateAccount] =
    useMemberPageUpdateAccountMutation();

  const member = useMemo(() => dataMember?.account, [dataMember]);

  const validationSchema = z.object({
    firstname: z.string().min(1, {
      message: translate.formatMessage({ id: "firstnameIsRequired" }),
    }),
    lastname: z.string().min(1, {
      message: translate.formatMessage({ id: "lastnameIsRequired" }),
    }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (member) {
      reset({
        firstname: member?.firstname || "",
        lastname: member?.lastname || "",
      });
    }
  }, [member, reset]);

  const onSubmit = async ({
    firstname,
    lastname,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdateAccount({
        input: {
          where: {
            account: member?.id,
          },
          data: {
            firstname,
            lastname,
          },
        },
      });
      if (!!response?.data?.updateAccount) {
        onShowToast({
          title: translate.formatMessage({ id: "accountUpdatedSuccessfully" }),
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

  return (
    <AppLayout>
      <Navbar />
      <Container display="flex" padding="5" align="center" justify="center">
        <Card
          width={["full", "full", "500px", "500px"]}
          background="background.50"
        >
          <CardBody>
            {isLoadingMember ? (
              <Loading />
            ) : (
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
                        textTransform="capitalize"
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
                        textTransform="capitalize"
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
            )}
          </CardBody>
        </Card>
      </Container>
    </AppLayout>
  );
};
