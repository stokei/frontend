import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import { useMemo } from "react";
import { MAX_IMAGE_SIZE } from "../../constants/file-sizes";
import { useStokeiUI, useUppy } from "../../hooks";
import { getUploaderLanguage } from "../../utils/get-uploader-language";
import { Stack, StackProps } from "../stack";

export interface ImageUploaderProps extends Omit<StackProps, "onError"> {
  readonly id: string;
  readonly uploadURL: string;
  readonly accept?: string[];
  readonly onSuccess: () => void;
  readonly onError: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  accept,
  uploadURL,
  onSuccess,
  onError,
  ...props
}) => {
  const { language } = useStokeiUI();

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
        .use(ImageEditor, { quality: 0.9, target: id }),
  });

  return (
    <Stack width="full" spacing="4" direction="column" {...props}>
      <Dashboard
        width="100%"
        height="100%"
        uppy={uppy}
        target={id}
        plugins={["ImageEditor"]}
        doneButtonHandler={() => {}}
        hideProgressAfterFinish
      />
    </Stack>
  );
};
