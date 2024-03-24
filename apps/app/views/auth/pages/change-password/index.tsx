import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Box,
  Container,
  FormChangePassword,
  FormChangePasswordOnSubmitData,
  useToast,
} from "@stokei/ui";

import { AuthLayout } from "../../layout";
import { useChangePasswordMutation } from "./graphql/change-password.mutation.graphql.generated";
import { useRouter } from "next/router";
import { routes } from "@/routes";

interface ChangePasswordPageProps {
  readonly code: string;
}

export const ChangePasswordPage = ({ code }: ChangePasswordPageProps) => {
  const translate = useTranslations();
  const router = useRouter();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingChangePassword }, onChangePassword] =
    useChangePasswordMutation();

  const onSubmit = async ({
    email,
    password,
  }: FormChangePasswordOnSubmitData) => {
    try {
      const response = await onChangePassword({
        input: {
          code,
          email,
          password,
        },
      });
      if (!!response?.data?.changePassword) {
        onShowToast({
          title: translate.formatMessage({ id: "updateSuccessfully" }),
          status: "success",
        });
        router.push(routes.home);
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
          <FormChangePassword
            isLoading={isLoadingChangePassword}
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </AuthLayout>
  );
};
