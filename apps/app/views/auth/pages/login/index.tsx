import { useAPIErrors, useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { AccountStatus } from "@/services/graphql/stokei";
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
        if (data.account.status === AccountStatus.ConfigurationPending) {
          router.push(
            appRoutes.auth.completeAccountConfiguration({
              account: data.account.id,
            })
          );
          return;
        }
        setAccessToken(data.accessToken, data.prefixToken);
        setRefreshToken(data.refreshToken);

        onShowToast({
          title: translate.formatMessage({ id: "loginSuccessfully" }),
          status: "success",
        });

        return window.location.assign(
          redirectToWhenLoginSuccessfully || appRoutes.customers.home
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
              router.push(appRoutes.auth.forgotPassword)
            }
            onRedirectToSignUpURL={() =>
              router.push({
                pathname: appRoutes.auth.signUp,
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
