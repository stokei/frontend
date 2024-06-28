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
          return response?.data?.url;
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
      return;
    },
    [onGenerate, onShowAPIError, translate]
  );

  const onGenerateFileDownloadURLAndRedirectToURL = useCallback(
    async (fileId: string) => {
      const currentURL = await onGenerateFileDownloadURL(fileId);
      if (currentURL) {
        const link = document.createElement("a");
        link.href = currentURL;
        link.setAttribute("download", "");
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link?.click();
        // Clean up and remove the link
        link?.parentNode?.removeChild(link);
        // window.open(currentURL, "_blank");
      }
    },
    [onGenerateFileDownloadURL]
  );

  return {
    url,
    isLoadingCreateFileDownloadURL,
    onGenerateFileDownloadURL,
    onGenerateFileDownloadURLAndRedirectToURL,
  };
};
