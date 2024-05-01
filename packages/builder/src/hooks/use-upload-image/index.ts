import { useCallback, useState } from "react";
import { useAPIErrors } from "../use-api-errors";
import { useTranslations } from "../use-translations";
import { useUseUploadImageCreateImageUploadUrlMutation } from "./graphql/create-image-upload-url.mutation.graphql.generated";
import { useUseUploadImageCreateImageMutation } from "./graphql/create-image.mutation.graphql.generated";
import { useUseUploadImageUpdateFileMutation } from "./graphql/update-file.mutation.graphql.generated";

export interface UpdateFileParams {
  extension?: string;
  mimetype?: string;
  size?: number;
  duration?: number;
}

export const useUploadImage = () => {
  const [fileId, setFileId] = useState<string>();
  const [imageId, setImageId] = useState<string>();
  const [isLoadingCompleteUpload, setIsLoadingCompleteUpload] = useState(false);
  const [uploadURL, setUploadURL] = useState("");
  const [
    { fetching: isLoadingStartUpload },
    onExecuteCreateImageUploadURLMutation,
  ] = useUseUploadImageCreateImageUploadUrlMutation();
  const [, onExecuteCreateImage] = useUseUploadImageCreateImageMutation();
  const [, onExecuteUpdateFile] = useUseUploadImageUpdateFileMutation();

  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();

  const onStartUpload = useCallback(async () => {
    try {
      const response = await onExecuteCreateImageUploadURLMutation({});
      if (!!response?.data?.createImageUploadURL?.uploadURL) {
        setFileId(response?.data?.createImageUploadURL?.file?.id);
        setUploadURL(response?.data?.createImageUploadURL?.uploadURL);
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
  }, [onExecuteCreateImageUploadURLMutation, onShowAPIError, translate]);

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
        const createImageResponse = await onExecuteCreateImage({
          input: {
            file: fileId,
          },
        });
        if (!!createImageResponse.error?.graphQLErrors?.length) {
          createImageResponse.error.graphQLErrors.map((error) =>
            onShowAPIError({ message: error?.message })
          );
          return;
        }
        setImageId(createImageResponse?.data?.createImage?.id);

        const updateImageResponse = await onExecuteUpdateFile({
          input: {
            data,
            where: {
              file: fileId,
            },
          },
        });
        if (!!updateImageResponse.error?.graphQLErrors?.length) {
          updateImageResponse.error.graphQLErrors.map((error) =>
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
    [
      fileId,
      onExecuteCreateImage,
      onExecuteUpdateFile,
      onShowAPIError,
      translate,
    ]
  );

  return {
    fileId,
    imageId,
    uploadURL,
    isLoadingCompleteUpload,
    isLoadingStartUpload,
    onStartUpload,
    onCompleteUpload,
  };
};
