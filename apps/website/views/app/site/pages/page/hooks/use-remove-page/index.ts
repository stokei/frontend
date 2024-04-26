import { useAPIErrors, useCurrentApp, useSite, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { useToast } from "@stokei/ui";
import { useCallback } from "react";
import { useRemovePageMutation } from "../../graphql/remove-page.mutation.graphql.generated";

export const useRemovePage = () => {
  const translate = useTranslations();
  const { siteId } = useSite();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading }, onExecuteRemovePage] =
    useRemovePageMutation();

  const onRemovePage = useCallback(
    async (page: string) => {
      try {
        const response = await onExecuteRemovePage({
          input: {
            where: {
              page,
            },
          },
        });
        if (!!response?.data?.removePage) {
          onShowToast({
            title: translate.formatMessage({ id: "removedSuccessfully" }),
            status: "success",
          });
          return window.location.assign(
            websiteRoutes.app({ appId: currentApp?.id }).site({
              site: siteId,
            }).pages
          );
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
      currentApp?.id,
      onExecuteRemovePage,
      onShowAPIError,
      onShowToast,
      siteId,
      translate,
    ]
  );

  return {
    isLoading,
    onRemovePage,
  };
};
