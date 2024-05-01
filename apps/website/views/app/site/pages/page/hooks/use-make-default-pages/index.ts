import { useAPIErrors, useSite, useTranslations } from "@/hooks";
import { useUpdateSiteMutation } from "@/views/app/site/graphql/update-site.mutation.graphql.generated";
import { useToast } from "@stokei/ui";
import { useCallback } from "react";

export const useMakeDefaultPages = () => {
  const translate = useTranslations();
  const { siteId, onReloadSite } = useSite();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const [{ fetching: isLoading }, onExecuteUpdateAppMutation] =
    useUpdateSiteMutation();

  const onUpdatePage = useCallback(
    async ({
      homePage,
      loginPage,
      signUpPage,
    }: {
      homePage?: string;
      loginPage?: string;
      signUpPage?: string;
    }) => {
      try {
        const response = await onExecuteUpdateAppMutation({
          input: {
            where: {
              site: siteId,
            },
            data: {
              homePage,
              loginPage,
              signUpPage,
            },
          },
        });
        if (!!response?.data?.updateSite) {
          onShowToast({
            title: translate.formatMessage({ id: "updatedSuccessfully" }),
            status: "success",
          });
          return onReloadSite();
        }

        if (!!response.error?.graphQLErrors?.length) {
          response.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
          return;
        }
      } catch (error) {
        onShowAPIError({ message: "sorryAnErrorOccurred" });
        return;
      }
    },
    [
      onExecuteUpdateAppMutation,
      onReloadSite,
      onShowAPIError,
      onShowToast,
      siteId,
      translate,
    ]
  );

  const onMakeHomePage = useCallback(
    (page: string) => onUpdatePage({ homePage: page }),
    [onUpdatePage]
  );
  const onMakeLoginPage = useCallback(
    (page: string) => onUpdatePage({ loginPage: page }),
    [onUpdatePage]
  );
  const onMakeSignUpPage = useCallback(
    (page: string) => onUpdatePage({ signUpPage: page }),
    [onUpdatePage]
  );

  return {
    isLoading,
    onMakeHomePage,
    onMakeLoginPage,
    onMakeSignUpPage,
  };
};
