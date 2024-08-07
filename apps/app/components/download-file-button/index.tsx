import { useTranslations } from "@/hooks";
import { useCreateFileDownloadURL } from "@/hooks/use-create-file-download-url";
import { Box, Button, Icon } from "@stokei/ui";

interface DownloadFileButtonProps {
  fileId: string;
}

export const DownloadFileButton = ({ fileId }: DownloadFileButtonProps) => {
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
