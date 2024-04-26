import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useRemoveVersion } from "../../../hooks/use-remove-version";

export const RemoveVersionButton = () => {
  const translate = useTranslations();
  const { version } = usePage();
  const { isLoading, onRemoveVersion } =
    useRemoveVersion();

  return (
    <MenuItem
      icon={<Icon name="trash" />}
      color="red.500"
      onClick={() => onRemoveVersion(version?.id || "")}
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "removeVersion",
      })}
    </MenuItem>
  );
};
