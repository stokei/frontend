import {
  useAPIErrors,
  useCurrentApp,
  usePage,
  useSite,
  useTranslations,
} from "@/hooks";
import { routes } from "@/routes";
import { useToast } from "@stokei/ui";
import { useCallback } from "react";
import { usePublishVersionMutation } from "../../graphql/publish-version.mutation.graphql.generated";

export const usePublishVersion = () => {
  const translate = useTranslations();
  const { siteId } = useSite();
  const { pageId } = usePage();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading }, onExecutePublishVersion] =
    usePublishVersionMutation();

  const onPublishVersion = useCallback(
    async (version: string) => {
      try {
        const response = await onExecutePublishVersion({
          input: {
            version,
          },
        });
        if (!!response?.data?.publishVersion) {
          const version = response?.data?.publishVersion?.id;
          onShowToast({
            title: translate.formatMessage({ id: "updatedSuccessfully" }),
            status: "success",
          });
          return window.location.assign(
            routes
              .app({ appId: currentApp?.id })
              .site({
                site: siteId,
              })
              .page({ page: pageId, version }).home
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
      onExecutePublishVersion,
      onShowAPIError,
      onShowToast,
      pageId,
      siteId,
      translate,
    ]
  );

  return {
    isLoading,
    onPublishVersion,
  };
};
