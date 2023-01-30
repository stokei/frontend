import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
} from "@stokei/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../hooks";

export interface FormForgotPasswordOnSubmitData {
  email: string;
}

export interface FormForgotPasswordProps {
  isLoading?: boolean;
  onSubmit: (data: FormForgotPasswordOnSubmitData) => void;
}

export const FormForgotPassword: FC<FormForgotPasswordProps> = ({
  isLoading,
  onSubmit,
}) => {
  const translate = useTranslations();

  const validationSchema = z.object({
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
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Card background="background.50">
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
            <Box width="full" flexDirection="column">
              <Title size="lg" marginBottom="2" lineHeight="shorter">
                {translate.formatMessage({ id: "forgotPassword" })}
              </Title>
              <Text>
                {translate.formatMessage({
                  id: "youWillGetAnEmailWithAResetLink",
                })}
              </Text>
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

            <Box width="full">
              <Button width="full" isLoading={isLoading} type="submit">
                {translate.formatMessage({ id: "requestReset" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </CardBody>
    </Card>
  );
};
