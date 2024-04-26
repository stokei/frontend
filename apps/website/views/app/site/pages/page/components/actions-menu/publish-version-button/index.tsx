import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { usePublishVersion } from "../../../hooks/use-publish-version";

export const PublishVersionButton = () => {
  const translate = useTranslations();
  const { version } = usePage();
  const { isLoading: isLoadingPublishVersion, onPublishVersion } =
    usePublishVersion();

  return (
    <MenuItem
      icon={<Icon name="version" />}
      onClick={() => onPublishVersion(version?.id || "")}
    >
      {translate.formatMessage({
        id: isLoadingPublishVersion ? "loading" : "publish",
      })}
    </MenuItem>
  );
};
