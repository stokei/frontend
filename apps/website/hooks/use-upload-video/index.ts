import { useCallback, useState } from "react";
import { useAPIErrors } from "../use-api-errors";
import { useTranslations } from "../use-translations";
import { useUseUploadVideoCreateVideoUploadUrlMutation } from "./graphql/create-video-upload-url.mutation.graphql.generated";
import { useUseUploadVideoUpdateFileMutation } from "./graphql/update-file.mutation.graphql.generated";

export interface UpdateFileParams {
  extension?: string;
  mimetype?: string;
  size?: number;
  duration?: number;
}

export const useUploadVideo = () => {
  const [fileId, setFileId] = useState<string>();
  const [isLoadingCompleteUpload, setIsLoadingCompleteUpload] = useState(false);
  const [uploadURL, setUploadURL] = useState("");
  const [
    { fetching: isLoadingStartUpload },
    onExecuteCreateVideoUploadURLMutation,
  ] = useUseUploadVideoCreateVideoUploadUrlMutation();
  const [, onExecuteUpdateFile] = useUseUploadVideoUpdateFileMutation();

  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();

  const onStartUpload = useCallback(async () => {
    try {
      const response = await onExecuteCreateVideoUploadURLMutation({});
      if (!!response?.data?.createVideoUploadURL?.uploadURL) {
        setFileId(response?.data?.createVideoUploadURL?.file?.id);
        setUploadURL(response?.data?.createVideoUploadURL?.uploadURL);
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
  }, [onExecuteCreateVideoUploadURLMutation, onShowAPIError, translate]);

  const onCompleteUpload = useCallback(
    async (data: UpdateFileParams) => {
      try {
        setIsLoadingCompleteUpload(true);
        if (!fileId) {
          onShowAPIError({
            message: translate.formatMessage({ id: "fileNotFound" }),
          });
          return;
        }
        const updateVideoFileResponse = await onExecuteUpdateFile({
          input: {
            data,
            where: {
              file: fileId,
            },
          },
        });
        if (!!updateVideoFileResponse.error?.graphQLErrors?.length) {
          updateVideoFileResponse.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
        }
      } catch (error) {
        onShowAPIError({
          message: translate.formatMessage({ id: "somethingWentWrong" }),
        });
      } finally {
        setIsLoadingCompleteUpload(false);
      }
    },
    [fileId, onExecuteUpdateFile, onShowAPIError, translate]
  );

  return {
    fileId,
    uploadURL,
    isLoadingCompleteUpload,
    isLoadingStartUpload,
    onStartUpload,
    onCompleteUpload,
  };
};
