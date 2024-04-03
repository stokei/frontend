import { useAPIErrors, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Navbar } from "./components/navbar";
import { useCreateAppMutation } from "./graphql/create-app.mutation.graphql.generated";

export const AddAppPage = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCreateApp }, onExecuteCreateAppMutation] =
    useCreateAppMutation();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    email: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "emailIsRequired" }) })
      .email({
        message: translate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({
    name,
    email,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateAppMutation({
        input: {
          name,
          email,
          currency: "BRL",
          language: "pt-BR",
        },
      });
      if (!!response?.data?.createApp) {
        onShowToast({
          title: translate.formatMessage({ id: "appCreatedSuccessfully" }),
          status: "success",
        });
        return window.location.assign(
          routes.app({ appId: response?.data?.createApp?.id }).home
        );
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({ message: "sorryAnErrorOccurred" });
    }
  };

  return (
    <>
      <Navbar />
      <Container paddingY="5">
        <Stack
          width="full"
          direction="column"
          spacing="4"
          align="center"
          justify="center"
        >
          <Title marginBottom="5" textAlign="center" lineHeight="shorter">
            {translate.formatMessage({ id: "addApp" })}
          </Title>
          <Card
            width={["full", "full", "500px", "500px"]}
            background="background.50"
          >
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="4">
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
                    <FormErrorMessage>
                      {errors?.email?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Box width="full" paddingBottom="4">
                    <Button
                      width="full"
                      isLoading={isLoadingCreateApp}
                      isDisabled={!isValid}
                      type="submit"
                    >
                      {translate.formatMessage({ id: "addApp" })}
                    </Button>
                  </Box>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </>
  );
};
