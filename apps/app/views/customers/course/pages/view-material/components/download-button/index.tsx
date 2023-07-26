import { useTranslations } from "@/hooks";
import { useCreateFileDownloadURL } from "@/hooks/create-file-download-url";
import { AppSubscriptionContractsByItemMaterialProductMaterialFragment } from "@/views/customers/materials/graphql/subscription-contracts.query.graphql.generated";
import { Box, Button, Icon } from "@stokei/ui";
import { FC, useEffect } from "react";

interface DownloadButtonProps {
  material?: AppSubscriptionContractsByItemMaterialProductMaterialFragment;
}

export const DownloadButton: FC<DownloadButtonProps> = ({ material }) => {
  const translate = useTranslations();

  const { url, isLoadingCreateFileDownloadURL, onGenerateFileDownloadURL } =
    useCreateFileDownloadURL();

  useEffect(() => {
    if (!!url) {
      window.open(url, "_blank");
    }
  }, [material?.name, url]);

  return (
    <Box>
      <Button
        as="a"
        leftIcon={<Icon name="download" />}
        variant="outline"
        onClick={() => onGenerateFileDownloadURL(material?.file?.id || "")}
        isLoading={isLoadingCreateFileDownloadURL}
      >
        {translate.formatMessage({ id: "download" })}
      </Button>
    </Box>
  );
};
