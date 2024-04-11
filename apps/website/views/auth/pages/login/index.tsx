import { useAPIErrors, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Box,
  Container,
  FormLogin,
  FormLoginOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AuthLayout } from "../../layout";
import { useLoginMutation } from "./graphql/login.mutation.graphql.generated";

export const LoginPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingLogin }, onLogin] = useLoginMutation();

  const redirectToWhenLoginSuccessfully = useMemo(
    () => router.query?.redirectTo?.toString(),
    [router]
  );

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
        return window.location.assign(
          redirectToWhenLoginSuccessfully || websiteRoutes.apps.home
        );
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
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
          <FormLogin
            isLoading={isLoadingLogin}
            onRedirectToForgotPasswordURL={() =>
              router.push(websiteRoutes.auth.forgotPassword)
            }
            onRedirectToSignUpURL={() =>
              router.push({
                pathname: websiteRoutes.auth.signUp,
                query: {
                  redirectTo: redirectToWhenLoginSuccessfully,
                },
              })
            }
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};
