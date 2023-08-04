import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { PagarmeAccountType } from "@/services/graphql/stokei";
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
  Input,
  InputGroup,
  Label,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "../../components/navbar";
import { useCreateAppPagarmeAccountMutation } from "./graphql/create-app-pagarme-account.mutation.graphql.generated";

interface OnboardingPixPageProps {}

export const OnboardingPixPage: FC<OnboardingPixPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [
    { fetching: isLoadingCreateAppPagarmeAccount },
    onExecuteCreateAppPagarmeAccount,
  ] = useCreateAppPagarmeAccountMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateAppPagarmeAccount({
        input: {
          defaultBankAccount: {
            accountCheckDigit: "",
            accountNumber: "",
            bank: "",
            branchCheckDigit: "",
            branchNumber: "",
            holderDocument: "",
            holderName: "",
            holderType: PagarmeAccountType.Individual,
          },
          document: "",
          type: PagarmeAccountType.Individual,
        },
      });
      if (!!response?.data?.createAppPagarmeAccount) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
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
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <Card background="background.50">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing="5">
                  <Title fontSize="xl">
                    {translate.formatMessage({ id: "pixOnboarding" })}
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
                  <ButtonGroup>
                    <Button
                      type="submit"
                      isLoading={isLoadingCreateAppPagarmeAccount}
                      isDisabled={!isValid}
                    >
                      {translate.formatMessage({ id: "save" })}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Stack>
    </AppLayout>
  );
};
