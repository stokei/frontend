import { useAPIErrors, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { setAccessToken, setRefreshToken } from "@stokei/graphql";
import {
  Box,
  Container,
  FormSignUp,
  FormSignUpOnSubmitData,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { useSignUpMutation } from "./signup.graphql.generated";

interface SignUpPageProps {}

export const SignUpPage: FC<SignUpPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingSignUp }, onSignUp] = useSignUpMutation();

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
        <FormSignUp
          isLoading={isLoadingSignUp}
          onRedirectToLoginURL={() => router.push(getRoutes().login)}
          onSubmit={onSubmit}
        />
      </Box>
    </Container>
  );
};
