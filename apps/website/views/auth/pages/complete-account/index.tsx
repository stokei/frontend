import { RoleName } from "@/constants/role-names";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormControl,
  FormErrorMessage,
  InputPassword,
  Label,
  Stack,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthLayout } from "../../layout";
import { useCompleteAccountConfigurationMutation } from "./graphql/complete-account-configuration.mutation.graphql.generated";
import { websiteRoutes } from "@stokei/routes";

export const CompleteAccountConfigurationPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const accountId = router.query?.account || "";

  const validationSchema = z.object({
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

  const [
    { fetching: isLoadingCompleteAccountConfiguration },
    onCompleteAccountConfiguration,
  ] = useCompleteAccountConfigurationMutation();

  const redirectToWhenCompleteAccountConfigurationSuccessfully = useMemo(
    () => router.query?.redirectTo?.toString(),
    [router]
  );

  const onSubmit = async ({ password }: z.infer<typeof validationSchema>) => {
    try {
      if (!accountId) {
        onShowToast({
          title: translate.formatMessage({ id: "somethingWentWrong" }),
          status: "error",
        });
        return;
      }
      const response = await onCompleteAccountConfiguration({
        input: {
          account: accountId + "",
          password,
        },
      });
      if (!!response?.data?.completeAccountConfiguration?.accessToken) {
        const data = response.data.completeAccountConfiguration;
        setAccessToken(data.accessToken, data.prefixToken);
        setRefreshToken(data.refreshToken);

        onShowToast({
          title: translate.formatMessage({ id: "loginSuccessfully" }),
          status: "success",
        });
        let url = redirectToWhenCompleteAccountConfigurationSuccessfully || "";
        if (!redirectToWhenCompleteAccountConfigurationSuccessfully) {
          url = websiteRoutes.apps.home;
        }
        window?.location?.assign(url);
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <AuthLayout>
      <Container
        display="flex"
        paddingY="5"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="full" maxWidth={["full", "full", "400px", "400px"]}>
          <Stack width="full" direction="column" spacing="4">
            <Title marginBottom="5" textAlign="center" lineHeight="shorter">
              {translate.formatMessage({ id: "enterNewPassword" })}
            </Title>
            <Card background="background.50">
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing="4">
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
                      <FormErrorMessage>
                        {errors?.password?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <Box width="full">
                      <Button
                        width="full"
                        isLoading={isLoadingCompleteAccountConfiguration}
                        type="submit"
                      >
                        {translate.formatMessage({ id: "enter" })}
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              </CardBody>
            </Card>
          </Stack>
        </Box>
      </Container>
    </AuthLayout>
  );
};
