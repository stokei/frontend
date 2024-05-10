import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import { appRoutes } from "@stokei/routes";
import {
  Box,
  FormLogin,
  FormLoginOnSubmitData,
  useToast
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useLoginMutation } from "./graphql/login.mutation.graphql.generated";
import { useTranslations } from "../../../../hooks";
import { AccountStatus } from "../../../../services/graphql/stokei";

interface LoginProps {
  title?: string;
  isBlockEditable?: boolean;
}

export const Login = ({ isBlockEditable, title }: LoginProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();

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
        let url = redirectToWhenLoginSuccessfully || appRoutes.customers.home
        if (data.account.status === AccountStatus.ConfigurationPending) {
          url = appRoutes.auth.completeAccountConfiguration({ account: data.account.id })
        }
        return window.location.assign(url);
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowToast({
            title: error?.message,
            status: "error",
          })
        );
      }
    } catch (error) { }
  };

  return (
    <Box width="full" align="center" justify="center">
      <Box width="full" maxWidth={["full", "full", "500px", "500px"]}>
        <FormLogin
          title={title}
          isLoading={isLoadingLogin}
          onRedirectToForgotPasswordURL={() =>
            window.location.assign(appRoutes.auth.forgotPassword)
          }
          onRedirectToSignUpURL={() =>
            window.location.assign(appRoutes.auth.signUp)
          }
          onSubmit={!isBlockEditable ? onSubmit : () => { }}
        />
      </Box>
    </Box>
  );
};
