import { usePage, useTranslations } from "@/hooks";
import { Button } from "@stokei/ui";
import { usePublishVersion } from "../../../hooks/use-publish-version";

export const PublishVersionButton = () => {
  const translate = useTranslations();
  const { version, isProductionVersion } = usePage();
  const { isLoading: isLoadingPublishVersion, onPublishVersion } =
    usePublishVersion();

  if (isProductionVersion) {
    return <></>
  }

  return (
    <Button
      onClick={() => onPublishVersion(version?.id || "")}
    >
      {translate.formatMessage({
        id: isLoadingPublishVersion ? "loading" : "publish",
      })}
    </Button>
  );
};
