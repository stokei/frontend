import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputPassword,
  Label,
  Stack,
  Text,
  Title,
} from "../..";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../hooks";

export interface FormLoginOnSubmitData {
  email: string;
  password: string;
}

export interface FormLoginProps {
  isLoading?: boolean;
  onRedirectToForgotPasswordURL: () => void;
  onRedirectToSignUpURL: () => void;
  onSubmit: (data: FormLoginOnSubmitData) => void;
}

export const FormLogin: FC<FormLoginProps> = ({
  isLoading,
  onSubmit,
  onRedirectToSignUpURL,
  onRedirectToForgotPasswordURL,
}) => {
  const translate = useTranslations();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "emailIsRequired" }) })
      .email({
        message: translate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
    password: z.string().min(6, {
      message: translate.formatMessage({
        id: "passwordMustBeAtleastSixCharacters",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  return (
    <Stack width="full" direction="column" spacing="4">
      <Title marginBottom="5" textAlign="center" lineHeight="shorter">
        {translate.formatMessage({ id: "signInToYourAccount" })}
      </Title>
      <Card background="background.50">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
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
              <FormControl isInvalid={!!errors?.password}>
                <Label htmlFor="password">
                  {translate.formatMessage({ id: "password" })}
                </Label>
                <InputPassword
                  id="password"
                  placeholder={translate.formatMessage({
                    id: "passwordPlaceholder",
                  })}
                  {...register("password")}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>

              <Box width="full">
                <Button variant="link" onClick={onRedirectToForgotPasswordURL}>
                  {translate.formatMessage({ id: "forgotPassword" })}
                </Button>
              </Box>

              <Box width="full">
                <Button width="full" isLoading={isLoading} type="submit">
                  {translate.formatMessage({ id: "enter" })}
                </Button>
              </Box>
            </Stack>
          </Form>
          <Stack
            direction="row"
            spacing="2"
            align="center"
            justify="center"
            marginTop="8"
          >
            <Text>{translate.formatMessage({ id: "noAccount" })}</Text>
            <Button variant="link" onClick={onRedirectToSignUpURL}>
              {translate.formatMessage({ id: "signUp" })}
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
