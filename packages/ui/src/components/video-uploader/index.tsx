import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { MAX_VIDEO_SIZE } from "../../constants/file-sizes";
import { useDisclosure, useStokeiUI, useUppy } from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Box } from "../box";
import { ButtonGroup } from "../button-group";
import { IconButton } from "../icon-button";
import { Stack, StackProps } from "../stack";
import { VideoPlayer } from "../video-player";

export interface VideoUploaderOnSuccessData {
  extension?: string;
  mimetype?: string;
  size?: number;
  duration?: number;
}

export interface VideoUploaderProps extends Omit<StackProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly previewURL?: string;
  readonly accept?: string[];
  readonly onStartUpload: () => void;
  readonly onSuccess: (data: VideoUploaderOnSuccessData) => void;
  readonly onError: () => void;
  readonly onRemoveFile?: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = memo(
  ({
    accept,
    uploadURL,
    previewURL,
    onStartUpload,
    onSuccess,
    onError,
    onRemoveFile,
    ...props
  }) => {
    const [file, setFile] = useState<any>();
    const { appId, accountId, cloudflareAPIToken, language } = useStokeiUI();
    const {
      isOpen: isOpenDashboard,
      onOpen: onOpenDashboard,
      onClose: onCloseDashboard,
    } = useDisclosure({
      startOpen: true,
    });

    const currentLanguage = useMemo(
      () => getUploaderLanguage(language),
      [language]
    );

    const hasUploadURL = useMemo(() => !!uploadURL, [uploadURL]);

    const fileURL = useMemo(() => file && URL.createObjectURL(file), [file]);

    const uppy = useUppy({
      onError,
      getUppy: () =>
        new Uppy({
          autoProceed: true,
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

    useEffect(() => {
      uppy.on("upload-success", async (result) => {
        const getVideoDuration = async (): Promise<number> => {
          if (result?.data) {
            return new Promise((resolve) => {
              const video = document.createElement("video");
              video.preload = "metadata";

              video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;
                resolve(duration);
              };
              video.onerror = () => {
                resolve(0);
              };

              video.src = URL.createObjectURL(result?.data);
            });
          }
          return 0;
        };
        const isSuccess = !!result?.data;
        if (isSuccess) {
          setFile(result.data);
          onCloseDashboard();
          onSuccess?.({
            size: result.size,
            mimetype: result.type,
            extension: result.extension,
            duration: await getVideoDuration(),
          });
        }
      });
    }, [uppy, onSuccess, onCloseDashboard]);

    const onShowDashboard = useCallback(() => {
      setFile(null);
      onOpenDashboard();
      onRemoveFile?.();
    }, [onOpenDashboard, onRemoveFile]);

    return (
      <Stack width="full" spacing="4" direction="column" {...props}>
        {(previewURL || fileURL) && (
          <Stack direction="column" spacing="5" width="full" maxWidth="96">
            <VideoPlayer
              id={props.id || "video-uploader-video-player-file-preview"}
              src={fileURL || previewURL}
            />
            {fileURL && (
              <ButtonGroup variant="outline">
                <IconButton name="trash" onClick={onShowDashboard} />
                <IconButton name="reload" onClick={onShowDashboard} />
              </ButtonGroup>
            )}
          </Stack>
        )}
        {isOpenDashboard && (
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
        )}
      </Stack>
    );
  }
);
VideoUploader.displayName = "VideoUploader";
