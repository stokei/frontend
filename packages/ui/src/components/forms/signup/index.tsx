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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "../../../hooks";

export interface FormSignUpOnSubmitData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface FormSignUpProps {
  title?: string;
  isLoading?: boolean;
  onRedirectToLoginURL: () => void;
  onSubmit: (data: FormSignUpOnSubmitData) => void;
}

export const FormSignUp = ({
  title,
  isLoading,
  onRedirectToLoginURL,
  onSubmit,
}: FormSignUpProps) => {
  const translate = useTranslations();

  const validationSchema = z.object({
    firstname: z.string().min(1, {
      message: translate.formatMessage({ id: "firstnameIsRequired" }),
    }),
    lastname: z.string().min(1, {
      message: translate.formatMessage({ id: "lastnameIsRequired" }),
    }),
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
        {title || translate.formatMessage({ id: "signUp" })}
      </Title>
      <Card background="background.50">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
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
                <FormErrorMessage>{errors?.lastname?.message}</FormErrorMessage>
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

              <Text fontSize="xs" color="text.300">
                {translate.formatMessage({
                  id: "byClickingRegisterYouAcceptOurTermsOfUseAndPrivacyPolicies",
                })}
              </Text>

              <Box width="full" paddingBottom="4">
                <Button width="full" isLoading={isLoading} type="submit">
                  {translate.formatMessage({ id: "save" })}
                </Button>
              </Box>

              <Stack
                direction="row"
                width="full"
                spacing="2"
                justifyContent="center"
                align="center"
              >
                <Text>{translate.formatMessage({ id: "alreadyAUser" })}</Text>
                <Button variant="link" onClick={onRedirectToLoginURL}>
                  {translate.formatMessage({ id: "login" })}
                </Button>
              </Stack>
            </Stack>
          </Form>
        </CardBody>
      </Card>
    </Stack>
  );
};
