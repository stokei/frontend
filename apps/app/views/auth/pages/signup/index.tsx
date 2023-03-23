import { RoleName } from "@/constants/role-names";
import { useAPIErrors, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { getDashboardHomePageURL } from "@/utils";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Box,
  Container,
  FormSignUp,
  FormSignUpOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useSignUpMutation } from "./graphql/signup.mutation.graphql.generated";
import { AuthLayout } from "../../layout";

interface SignUpPageProps {}

export const SignUpPage: FC<SignUpPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingSignUp }, onSignUp] = useSignUpMutation();

  const redirectToWhenSignUpSuccessfully = useMemo(
    () => router.query?.redirectTo?.toString(),
    [router]
  );

  const onSubmit = async ({
    email,
    password,
    firstname,
    lastname,
  }: FormSignUpOnSubmitData) => {
    try {
      const response = await onSignUp({
        input: {
          firstname,
          lastname,
          email,
          password,
        },
      });
      if (!!response?.data?.signUp?.accessToken) {
        const data = response.data.signUp;
        setAccessToken(data.accessToken, data.prefixToken);
        setRefreshToken(data.refreshToken);

        onShowToast({
          title: translate.formatMessage({ id: "signUpSuccessfully" }),
          status: "success",
        });
        const isAdmin =
          !!data.account?.isOwner ||
          !!data.account?.roles?.items?.some(
            (role) => role.name === RoleName.ADMIN
          );
        window?.location?.assign(
          getDashboardHomePageURL({
            redirectTo: redirectToWhenSignUpSuccessfully || undefined,
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
          <FormSignUp
            isLoading={isLoadingSignUp}
            onRedirectToLoginURL={() =>
              router.push({
                pathname: routes.auth.login,
                query: {
                  redirectTo: redirectToWhenSignUpSuccessfully,
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
