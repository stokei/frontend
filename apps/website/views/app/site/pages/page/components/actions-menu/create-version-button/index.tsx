import { useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useCreateNewVersion } from "../../../hooks/use-create-new-version";

export const CreateVersionButton = () => {
  const translate = useTranslations();
  const { isLoading: isLoadingCreateNewVersion, onCreateNewVersion } =
    useCreateNewVersion();

  return (
    <MenuItem
      icon={<Icon name="version" />}
      onClick={onCreateNewVersion}
    >
      {translate.formatMessage({
        id: isLoadingCreateNewVersion ? "loading" : "createNewVersion",
      })}
    </MenuItem>
  );
};
