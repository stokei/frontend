import {
  useAPIErrors,
  useCurrentApp,
  usePage,
  useSite,
  useTranslations,
} from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { useToast } from "@stokei/ui";
import { useCallback } from "react";
import { useRemoveVersionMutation } from "../../graphql/remove-version.mutation.graphql.generated";

export const useRemoveVersion = () => {
  const translate = useTranslations();
  const { siteId } = useSite();
  const { page } = usePage();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading }, onExecuteRemoveVersion] =
    useRemoveVersionMutation();

  const onRemoveVersion = useCallback(
    async (version: string) => {
      try {
        const response = await onExecuteRemoveVersion({
          input: {
            where: {
              version,
            },
          },
        });
        if (!!response?.data?.removeVersion) {
          onShowToast({
            title: translate.formatMessage({ id: "removedSuccessfully" }),
            status: "success",
          });
          return window.location.assign(
            websiteRoutes
              .app({ appId: currentApp?.id })
              .site({
                site: siteId,
              })
              .page({ page: page?.id || "", version: page?.version?.id }).home
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
      onExecuteRemoveVersion,
      onShowAPIError,
      onShowToast,
      page?.id,
      page?.version?.id,
      siteId,
      translate,
    ]
  );

  return {
    isLoading,
    onRemoveVersion,
  };
};
