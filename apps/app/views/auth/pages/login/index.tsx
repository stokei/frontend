import { RoleName } from "@/constants/role-names";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { getDashboardHomePageURL } from "@/utils";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
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
import { AuthLayout } from "../../layout";
import { AccountStatus } from "@/services/graphql/stokei";

interface LoginPageProps {
  readonly redirectTo?: string;
}

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
        if (data.account.status === AccountStatus.ConfigurationPending) {
          router.push(
            routes.auth.completeAccountConfiguration({
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
        const isAdmin =
          !!data.account?.isOwner ||
          !!data.account?.roles?.items?.some(
            (role) => role.name === RoleName.ADMIN
          );
        window?.location?.assign(
          getDashboardHomePageURL({
            redirectTo: redirectToWhenLoginSuccessfully || undefined,
            isAdmin,
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
              router.push(routes.auth.forgotPassword)
            }
            onRedirectToSignUpURL={() =>
              router.push({
                pathname: routes.auth.signUp,
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
