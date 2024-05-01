import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  ImageUploader,
  Label,
  Stack
} from "@stokei/ui";

import { useTranslations } from "../../../../hooks/use-translations";
import { useUploadImage } from "../../../../hooks/use-upload-image";
import { ImageData } from "../../hooks/use-data-to-props";

interface UpdateImageDrawerProps {
  id: string;
  currentData?: ImageData;
  isOpen?: boolean;
  onUpdate?: (data?: ImageData) => void;
  onClose: () => void;
}

export const UpdateImageDrawer = ({
  id,
  isOpen,
  currentData,
  onClose,
  onUpdate,
}: UpdateImageDrawerProps) => {
  const translate = useTranslations();

  const {
    imageId,
    isLoadingStartUpload: isLoadingStartImageUpload,
    onStartUpload: onStartImageUpload,
    onCompleteUpload: onCompleteImageUpload,
    uploadURL: imageUploadURL,
  } = useUploadImage();

  const onSubmit = async () => {
    onUpdate?.({
      image: imageId,
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
              <Label htmlFor={id + "-image-drawer"}>
                {translate.formatMessage({ id: "image" })}
              </Label>
              {!imageUploadURL && (
                <Button
                  variant="outline"
                  onClick={onStartImageUpload}
                  isLoading={isLoadingStartImageUpload}
                  marginBottom="5"
                >
                  {translate.formatMessage({ id: "addImage" })}
                </Button>
              )}
              <ImageUploader
                id={id + "-image-drawer"}
                uploadURL={imageUploadURL}
                previewURL={currentData?.image || ""}
                onSuccess={onCompleteImageUpload}
                onError={() => { }}
              />
            </FormControl>
            <Box width="full" paddingBottom="4">
              <Button width="full" isDisabled={!imageId} type="submit">
                {translate.formatMessage({ id: "save" })}
              </Button>
            </Box>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
