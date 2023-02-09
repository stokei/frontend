import Uppy from "@uppy/core";
import { Dashboard, DashboardModal, useUppy } from "@uppy/react";
import Tus from "@uppy/tus";
import { useEffect, useMemo } from "react";
import { MAX_VIDEO_SIZE } from "../../constants/file-sizes";
import { useStokeiUI } from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Box, BoxProps } from "../box";

export interface VideoUploaderProps extends Omit<BoxProps, "onError"> {
  readonly id: string;
  readonly isOpen?: boolean;
  readonly uploadURL: string;
  readonly accept?: string[];
  readonly onClose: () => void;
  readonly onSuccess: () => void;
  readonly onError: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  accept,
  isOpen,
  uploadURL,
  onSuccess,
  onError,
  ...props
}) => {
  const { appId, accountId, cloudflareAPIToken, language } = useStokeiUI();
  /**
   *
   *  verificar porque a URL NÃO MUDA QUANDO TENTA MUDAR O uploadURL
   *
   */
  const currentLanguage = useMemo(
    () => getUploaderLanguage(language),
    [language]
  );

  const uppy = useUppy(() => {
    return new Uppy({
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
    });
  });

  useEffect(() => {
    return () => uppy.close({ reason: "unmount" });
  }, [uppy]);

  useEffect(() => {
    uppy.on("upload-success", (result) => {
      const isSuccess = !!result?.data;
      if (isSuccess) {
        onSuccess?.();
      }
    });
  }, [uppy, onSuccess]);

  useEffect(() => {
    uppy.on("upload-error", (result) => {
      const isFailed = !!result?.data;
      if (isFailed) {
        onError?.();
      }
    });
  }, [uppy, onError]);

  return (
    <Box width="full" flexDirection="column" {...props}>
      <DashboardModal
        width="100%"
        height="100%"
        uppy={uppy}
        open={isOpen}
        doneButtonHandler={() => {}}
        hideProgressAfterFinish
      />
    </Box>
  );
};
