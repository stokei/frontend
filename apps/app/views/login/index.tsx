import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  Container,
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
import { useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
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

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container
      display="flex"
      paddingY="5"
      justifyContent="center"
      alignItems="center"
    >
      <Stack maxWidth="500px" direction="column" spacing="4">
        <Title marginBottom="5" textAlign="center">
          {tranlate.formatMessage({ id: "title" })}
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
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack
                  direction={["column", "column", "row", "row"]}
                  spacing="4"
                >
                  <Button type="submit">
                    {tranlate.formatMessage({ id: "enter" })}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};
