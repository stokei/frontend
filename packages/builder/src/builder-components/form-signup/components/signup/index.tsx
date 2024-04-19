import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import { appRoutes, websiteRoutes } from "@stokei/routes";
import {
  Box,
  FormSignUp,
  FormSignUpOnSubmitData,
  useToast
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useSignUpMutation } from "./graphql/signup.mutation.graphql.generated";
import { useTranslations } from "../../../../hooks";

interface SignUpProps {
  isBlockEditable?: boolean;
}

export const SignUp = ({ isBlockEditable }: SignUpProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();

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
          redirectToWhenSignUpSuccessfully || appRoutes.customers.home
        );
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
    <Box width="full" maxWidth={["full", "full", "400px", "400px"]}>
      <FormSignUp
        isLoading={isLoadingSignUp}
        onRedirectToLoginURL={() =>
          window.location.assign(appRoutes.auth.login)
        }
        onSubmit={!isBlockEditable ? onSubmit : () => { }}
      />
    </Box>
  );
};
