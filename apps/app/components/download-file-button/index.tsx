import { useTranslations } from "@/hooks";
import { useCreateFileDownloadURL } from "@/hooks/create-file-download-url";
import { Box, Button, Icon } from "@stokei/ui";
import { FC } from "react";

interface DownloadFileButtonProps {
  fileId: string;
}

export const DownloadFileButton: FC<DownloadFileButtonProps> = ({ fileId }) => {
  const translate = useTranslations();

  const {
    isLoadingCreateFileDownloadURL,
    onGenerateFileDownloadURLAndRedirectToURL,
  } = useCreateFileDownloadURL();

  return (
    <Box>
      <Button
        leftIcon={<Icon name="download" />}
        variant="outline"
        onClick={() => onGenerateFileDownloadURLAndRedirectToURL(fileId || "")}
        isLoading={isLoadingCreateFileDownloadURL}
      >
        {translate.formatMessage({ id: "download" })}
      </Button>
    </Box>
  );
};
