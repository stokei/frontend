import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
} from "../..";
import { useTranslations } from "../../../hooks";

export interface FormChangePasswordOnSubmitData {
  email: string;
  password: string;
}

export interface FormChangePasswordProps {
  isLoading?: boolean;
  onSubmit: (data: FormChangePasswordOnSubmitData) => void;
}

export const FormChangePassword = ({
  isLoading,
  onSubmit,
}: FormChangePasswordProps) => {
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
    <Card background="background.50">
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
            <Box width="full" flexDirection="column">
              <Title size="lg" lineHeight="shorter">
                {translate.formatMessage({ id: "enterNewPassword" })}
              </Title>
            </Box>
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
              <Button width="full" isLoading={isLoading} type="submit">
                {translate.formatMessage({ id: "changePassword" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </CardBody>
    </Card>
  );
};
