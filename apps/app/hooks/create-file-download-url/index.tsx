import { useCallback, useState } from "react";
import { useAPIErrors } from "../use-api-errors";
import { useTranslations } from "../use-translations";
import { useCreateFileDownloadUrlMutation } from "./create-file-download-url.mutation.graphql.generated";

export const useCreateFileDownloadURL = () => {
  const [url, setURL] = useState("");
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();
  const [{ fetching: isLoadingCreateFileDownloadURL }, onGenerate] =
    useCreateFileDownloadUrlMutation();

  const onGenerateFileDownloadURL = useCallback(
    async (fileId: string) => {
      try {
        const response = await onGenerate({
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
    [onGenerate, onShowAPIError, translate]
  );

  return {
    url,
    onGenerateFileDownloadURL,
    isLoadingCreateFileDownloadURL,
  };
};
