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
  Title,
} from "@stokei/ui";
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
  onRedirectToForgotPasswordURL,
  onSubmit,
}) => {
  const tranlate = useTranslations();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: tranlate.formatMessage({ id: "emailIsRequired" }) })
      .email({
        message: tranlate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
    password: z.string().min(6, {
      message: tranlate.formatMessage({
        id: "passwordMustBeAtleastSixCharacters",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Stack width="full" direction="column" spacing="4">
      <Title marginBottom="5" textAlign="center" lineHeight="shorter">
        {tranlate.formatMessage({ id: "signInToYourAccount" })}
      </Title>
      <Card background="background.50">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
              <FormControl isInvalid={!!errors?.email}>
                <Label htmlFor="email">
                  {tranlate.formatMessage({ id: "email" })}
                </Label>
                <InputGroup>
                  <Input id="email" {...register("email")} />
                </InputGroup>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password}>
                <Label htmlFor="password">
                  {tranlate.formatMessage({ id: "password" })}
                </Label>
                <InputPassword id="password" {...register("password")} />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Box width="full">
                <Button variant="link" onClick={onRedirectToForgotPasswordURL}>
                  {tranlate.formatMessage({ id: "forgotPassword" })}
                </Button>
              </Box>
              <Stack direction={["column", "column", "row", "row"]} spacing="4">
                <Button isLoading={isLoading} type="submit">
                  {tranlate.formatMessage({ id: "enter" })}
                </Button>
              </Stack>
            </Stack>
          </Form>
        </CardBody>
      </Card>
    </Stack>
  );
};
