import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAX_FILE_SIZE } from "../../constants/file-sizes";
import { useDisclosure, useStokeiUI, useUppy } from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Box } from "../box";
import { ButtonGroup } from "../button-group";
import { IconButton } from "../icon-button";
import { Stack, StackProps } from "../stack";
import { Title } from "../title";

const defaultMimetypes = [".pdf", ".zip", ".rar", ".7zip"];

export interface FileUploaderFilePreview {
  url?: string;
  filename: string;
}

export interface FileUploaderOnSuccessData {
  file: string;
}

export interface FileUploaderProps extends Omit<StackProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly accept?: string[];
  readonly onSuccess: (data: FileUploaderOnSuccessData) => void;
  readonly onError: () => void;
  readonly onRemoveFile?: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  accept,
  uploadURL,
  onSuccess,
  onError,
  onRemoveFile,
  ...props
}) => {
  const [file, setFile] = useState<any>();
  const { language, appId, accountAccessToken, accountRefreshToken } =
    useStokeiUI();

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
          allowedFileTypes: accept || defaultMimetypes,
          maxFileSize: MAX_FILE_SIZE,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
        },
      }).use(XHRUpload, {
        endpoint: uploadURL,
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 1,
        allowedMetaFields: [],
        headers: {
          authorization: accountAccessToken || "",
          "x-refresh-token": accountRefreshToken || "",
          "x-app-id": appId || "",
        },
        getResponseData(responseText, response) {
          if (!response) {
            return;
          }
          const responseData: any = response;
          const bodyData = responseData.response;
          return bodyData;
        },
      }),
  });

  useEffect(() => {
    uppy.on("upload-success", async (result, response) => {
      const isSuccess = !!result?.data;
      if (isSuccess) {
        let responseJSON: { file: { id: string } } | undefined = undefined;
        try {
          responseJSON = JSON.parse(response.body);
        } catch (error) {
          responseJSON = undefined;
        }
        setFile(result.data);
        onCloseDashboard();
        onSuccess?.({ file: responseJSON?.file?.id || "" });
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
      {fileURL && (
        <Stack direction="column" spacing="5" width="full">
          <Stack direction="column" spacing="5" width="full">
            <Title fontSize="md">{file?.name}</Title>
          </Stack>
          <ButtonGroup variant="outline">
            <IconButton name="trash" onClick={onShowDashboard} />
            <IconButton name="reload" onClick={onShowDashboard} />
          </ButtonGroup>
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
};
