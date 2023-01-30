import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import { useAPIErrors, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import {
  Box,
  Container,
  FormLogin,
  FormLoginOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { useLoginMutation } from "./login.graphql.generated";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingLogin }, onLogin] = useLoginMutation();

  const onSubmit = async ({ email, password }: FormLoginOnSubmitData) => {
    try {
      const response = await onLogin({
        input: {
          email,
          password,
        },
      });
      if (!!response?.data?.login?.accessToken) {
        const data = response.data.login;
        setAccessToken(data.accessToken, data.prefixToken);
        setRefreshToken(data.refreshToken);

        onShowToast({
          title: translate.formatMessage({ id: "loginSuccessfully" }),
          status: "success",
        });
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Container
      display="flex"
      paddingY="5"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="full" maxWidth={["full", "full", "400px", "400px"]}>
        <FormLogin
          isLoading={isLoadingLogin}
          onRedirectToForgotPasswordURL={() =>
            router.push(getRoutes().forgotPassword)
          }
          onRedirectToSignUpURL={() => router.push(getRoutes().signUp)}
          onSubmit={onSubmit}
        />
      </Box>
    </Container>
  );
};
