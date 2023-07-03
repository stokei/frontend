import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAX_IMAGE_SIZE } from "../../constants/file-sizes";
import {
  useDisclosure,
  useStokeiUI,
  useTranslations,
  useUppy,
} from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Box } from "../box";
import { ButtonGroup } from "../button-group";
import { IconButton } from "../icon-button";
import { Image } from "../image";
import { Stack, StackProps } from "../stack";

export interface ImageUploaderOnSuccessData {
  extension?: string;
  mimetype?: string;
  size?: number;
  duration?: number;
}

export interface ImageUploaderProps extends Omit<StackProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly previewURL?: string;
  readonly accept?: string[];
  readonly onSuccess: (data: ImageUploaderOnSuccessData) => void;
  readonly onError: () => void;
  readonly onRemoveFile?: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  accept,
  uploadURL,
  previewURL,
  onSuccess,
  onError,
  onRemoveFile,
  ...props
}) => {
  const [file, setFile] = useState<any>();
  const { language } = useStokeiUI();
  const translate = useTranslations();
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
          allowedFileTypes: accept || ["image/*"],
          maxFileSize: MAX_IMAGE_SIZE,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
        },
      })
        .use(XHRUpload, {
          endpoint: uploadURL,
          method: "POST",
          formData: true,
          fieldName: "file",
          limit: 1,
          allowedMetaFields: [],
          getResponseData(responseText, response) {
            if (!response) {
              return;
            }
            const responseData: any = response;
            const bodyData = responseData.response;
            return bodyData;
          },
        })
        .use(ImageEditor, { id: "ImageEditor", quality: 0.9 }),
  });

  useEffect(() => {
    uppy.on("upload-success", async (result) => {
      const isSuccess = !!result?.data;
      if (isSuccess) {
        setFile(result.data);
        onCloseDashboard();
        onSuccess?.({
          size: result.size,
          mimetype: result.type,
          extension: result.extension,
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
        <Stack direction="column" spacing="5" width="full" maxWidth="40">
          <Image
            width="full"
            src={fileURL || previewURL}
            alt={translate.formatMessage({ id: "show" })}
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
            plugins={["ImageEditor"]}
            doneButtonHandler={() => {}}
            hideProgressAfterFinish
          />
        </Box>
      )}
    </Stack>
  );
};
