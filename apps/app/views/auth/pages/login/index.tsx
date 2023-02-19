import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import { useAPIErrors, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Box,
  Container,
  FormLogin,
  FormLoginOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useLoginMutation } from "./graphql/login.mutation.graphql.generated";
import { getDashboardHomePageURL } from "@/utils";
import { LoginLayout } from "./layout";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
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
        window?.location?.assign(
          getDashboardHomePageURL({
            redirectTo: redirectToWhenLoginSuccessfully || undefined,
            isAdmin: !!data.account.isAdmin,
          })
        );
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <LoginLayout>
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
              router.push(routes.forgotPassword)
            }
            onRedirectToSignUpURL={() =>
              router.push({
                pathname: routes.signUp,
                query: {
                  redirectTo: redirectToWhenLoginSuccessfully,
                },
              })
            }
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </LoginLayout>
  );
};
