import { useAPIErrors, useTranslations } from "@/hooks";
import { Container, FormUpdateOwnPassword, useToast } from "@stokei/ui";
import { FC } from "react";
import { MeLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { useUpdateOwnPasswordMutation } from "./graphql/update-own-password.mutation.graphql.generated";

interface MePasswordPageProps {}

export const MePasswordPage: FC<MePasswordPageProps> = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingUpdateOwnPassword }, onUpdateOwnPassword] =
    useUpdateOwnPasswordMutation();

  const onSubmit = async () => {
    try {
      const response = await onUpdateOwnPassword({});
      if (!!response?.data?.updateOwnPassword) {
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
    <MeLayout>
      <Navbar />
      <Container
        display="flex"
        paddingY="5"
        justifyContent="center"
        alignItems="center"
      >
        <FormUpdateOwnPassword
          isLoading={isLoadingUpdateOwnPassword}
          onSubmit={onSubmit}
        />
      </Container>
    </MeLayout>
  );
};
