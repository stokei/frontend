import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Box,
  Container,
  FormForgotPassword,
  FormForgotPasswordOnSubmitData,
  useToast,
} from "@stokei/ui";

import { useForgotPasswordMutation } from "./graphql/forgot-password.mutation.graphql.generated";
import { AuthLayout } from "../../layout";

export const ForgotPasswordPage = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingForgotPassword }, onForgotPassword] =
    useForgotPasswordMutation();

  const onSubmit = async ({ email }: FormForgotPasswordOnSubmitData) => {
    try {
      const response = await onForgotPassword({
        input: {
          email,
        },
      });
      if (!!response?.data?.forgotPassword) {
        onShowToast({
          title: translate.formatMessage({ id: "requestSent" }),
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
    <AuthLayout>
      <Container
        display="flex"
        paddingY="5"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="full" maxWidth={["full", "full", "400px", "400px"]}>
          <FormForgotPassword
            isLoading={isLoadingForgotPassword}
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};
