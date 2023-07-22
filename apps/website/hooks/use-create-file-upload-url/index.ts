import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { useCreateFileDownloadUrlMutation } from "./create-file-download-url.mutation.graphql.generated";
import { useAPIErrors } from "@/hooks/use-api-errors";

export const useCreateFileDownloadURL = () => {
  const [url, setURL] = useState<string>("");
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();

  const [{ data, fetching: isLoading }, onExecuteCreateFileDownloadURL] =
    useCreateFileDownloadUrlMutation();

  useEffect(() => {
    if (!!data?.url) {
      setURL(data?.url);
    }
  }, [data]);

  const onCreateFileDownloadURL = useCallback(
    async (fileId: string) => {
      try {
        const response = await onExecuteCreateFileDownloadURL({
          input: {
            file: fileId,
          },
        });
        if (!!response?.data?.url) {
          setURL(response?.data?.url);
          return;
        }
        if (!!response.error?.graphQLErrors?.length) {
          response.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
        }
      } catch (error) {
        onShowAPIError({
          message: translate.formatMessage({ id: "somethingWentWrong" }),
        });
      }
    },
    [onExecuteCreateFileDownloadURL, onShowAPIError, translate]
  );

  return {
    url,
    isLoading,
    onCreateFileDownloadURL,
  };
};
