import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { useMemo } from "react";
import { MAX_VIDEO_SIZE } from "../../constants/file-sizes";
import { useStokeiUI, useTranslations, useUppy } from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Box, BoxProps } from "../box";
import { Button } from "../button";

export interface VideoUploaderProps extends Omit<BoxProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly accept?: string[];
  readonly onStartUpload: () => void;
  readonly onSuccess: () => void;
  readonly onError: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  accept,
  uploadURL,
  onStartUpload,
  onSuccess,
  onError,
  ...props
}) => {
  const { appId, accountId, cloudflareAPIToken, language } = useStokeiUI();

  const translate = useTranslations();

  const currentLanguage = useMemo(
    () => getUploaderLanguage(language),
    [language]
  );

  const uppy = useUppy({
    onError,
    onSuccess,
    getUppy: () =>
      new Uppy({
        locale: currentLanguage,
        allowMultipleUploadBatches: false,
        restrictions: {
          allowedFileTypes: accept || ["video/*"],
          maxFileSize: MAX_VIDEO_SIZE,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
        },
        meta: {
          accountId,
          appId,
        },
      }).use(Tus, {
        endpoint: uploadURL,
        removeFingerprintOnSuccess: true,
        headers: {
          Authorization: `Bearer ${cloudflareAPIToken}`,
        },
        onShouldRetry() {
          return false;
        },
      }),
  });

  const hasUploadURL = !!uploadURL;

  return (
    <Box width="full" flexDirection="column" {...props}>
      <Box
        width="full"
        flexDirection="column"
        display={!hasUploadURL ? "none" : "flex"}
      >
        <Dashboard
          width="100%"
          height="100%"
          uppy={uppy}
          doneButtonHandler={() => {}}
          hideProgressAfterFinish
        />
      </Box>
    </Box>
  );
};
