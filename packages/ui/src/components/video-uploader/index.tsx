import { useState, useEffect, useMemo } from "react";
import Uppy from "@uppy/core";
import { Dashboard, useUppy } from "@uppy/react";
import Tus from "@uppy/tus";
import { MAX_VIDEO_SIZE } from "../../constants/file-sizes";
import { useStokei } from "../../hooks";
import { Stack, StackProps } from "../stack";
import { getUploaderLanguage } from "../../utils/get-uploader-language";

export interface VideoUploaderProps extends Omit<StackProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly accept?: string[];
  readonly onSuccess: (fileId: string) => void;
  readonly onError: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  accept,
  uploadURL,
  onSuccess,
  onError,
  ...props
}) => {
  const [fileId, setFileId] = useState("");

  const { appId, accountId, cloudflareAPIToken, language } = useStokei();

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
      onAfterResponse(req, res) {
        const body = res.getBody();
        const bodyFormated = body && JSON.parse(body);
        if (bodyFormated?.file?.id) {
          setFileId(bodyFormated?.file?.id);
        }
      },
    });
  });

  useEffect(() => {
    return () => uppy.close({ reason: "unmount" });
  }, [uppy]);

  useEffect(() => {
    uppy.on("upload-success", (result) => {
      const isSuccess = !!result?.data;
      if (fileId && isSuccess) {
        onSuccess?.(fileId);
      }
    });
  }, [uppy, fileId, onSuccess]);

  useEffect(() => {
    uppy.on("upload-error", (result) => {
      const isFailed = !!result?.data;
      if (isFailed) {
        onError?.();
      }
    });
  }, [uppy, onError]);

  return (
    <Stack width="full" spacing="4" direction="column" {...props}>
      <Dashboard
        width="100%"
        height="100%"
        uppy={uppy}
        doneButtonHandler={() => {}}
        hideProgressAfterFinish
      />
    </Stack>
  );
};
