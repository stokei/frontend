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
import { useCreateVersionMutation } from "../../graphql/create-version.mutation.graphql.generated";

export const useCreateNewVersion = () => {
  const translate = useTranslations();
  const { siteId } = useSite();
  const { pageId } = usePage();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading }, onExecuteCreateVersion] =
    useCreateVersionMutation();

  const onCreateNewVersion = useCallback(async () => {
    try {
      const response = await onExecuteCreateVersion({
        input: {
          parent: pageId || "",
        },
      });
      if (!!response?.data?.createVersion) {
        const version = response?.data?.createVersion?.id;
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
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
  }, [
    currentApp?.id,
    onExecuteCreateVersion,
    onShowAPIError,
    onShowToast,
    pageId,
    siteId,
    translate,
  ]);

  return {
    isLoading,
    onCreateNewVersion,
  };
};
