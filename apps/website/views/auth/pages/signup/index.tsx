import { useAPIErrors, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Box,
  Container,
  FormSignUp,
  FormSignUpOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AuthLayout } from "../../layout";
import { useSignUpMutation } from "./graphql/signup.mutation.graphql.generated";

export const SignUpPage = () => {
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
        return window.location.assign(
          redirectToWhenSignUpSuccessfully || websiteRoutes.apps.home
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
          <FormSignUp
            isLoading={isLoadingSignUp}
            onRedirectToLoginURL={() =>
              router.push({
                pathname: websiteRoutes.auth.login,
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
