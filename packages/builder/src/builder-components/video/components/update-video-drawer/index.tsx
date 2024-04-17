import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  VideoUploader,
  Label,
  Stack
} from "@stokei/ui";

import { useTranslations } from "../../../../hooks/use-translations";
import { useUploadVideo } from "../../../../hooks/use-upload-video";
import { VideoData } from "../../hooks/use-data-to-props";

interface UpdateVideoDrawerProps {
  id: string;
  currentData?: VideoData;
  isOpen?: boolean;
  onUpdate?: (data?: VideoData) => void;
  onClose: () => void;
}

export const UpdateVideoDrawer = ({
  id,
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateVideoDrawerProps) => {
  const translate = useTranslations();

  const {
    fileId: videoFileId,
    onCreateVideo,
    isLoadingStartUpload: isLoadingStartVideoUpload,
    onStartUpload: onStartVideoUpload,
    onCompleteUpload: onCompleteVideoUpload,
    uploadURL: videoUploadURL,
  } = useUploadVideo();

  const onSubmit = async () => {
    const videoUploaded = await onCreateVideo({
      parent: id,
      name: id,
    });
    if (!videoUploaded) {
      return;
    }
    onUpdate?.({
      video: videoUploaded?.id,
    });
    onClose();
  };

  const onCloseWithReset = () => {
    onClose();
  };

  return (
    <Drawer isOpen={!!isOpen} onClose={onCloseWithReset}>
      <DrawerHeader>
        {translate.formatMessage({ id: "updateComponent" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={onSubmit}>
          <Stack spacing="4">
            <FormControl>
              <Label htmlFor={id + "-video-drawer"}>
                {translate.formatMessage({ id: "video" })}
              </Label>
              {!videoUploadURL && (
                <Button
                  variant="outline"
                  onClick={onStartVideoUpload}
                  isLoading={isLoadingStartVideoUpload}
                  marginBottom="5"
                >
                  {translate.formatMessage({ id: "addVideo" })}
                </Button>
              )}
              <VideoUploader
                id={id + "-video-drawer"}
                uploadURL={videoUploadURL}
                preview={
                  currentData?.video
                    ? {
                      url: currentData?.video || "",
                      filename: currentData?.filename || "",
                    }
                    : undefined
                }
                onSuccess={onCompleteVideoUpload}
                onStartUpload={onStartVideoUpload}
                onError={() => { }}
              />
            </FormControl>
            <Box width="full" paddingBottom="4">
              <Button width="full" isDisabled={!videoFileId} type="submit">
                {translate.formatMessage({ id: "save" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
