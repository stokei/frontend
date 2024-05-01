import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useRemovePage } from "../../../hooks/use-remove-page";

export const RemovePageButton = () => {
  const translate = useTranslations();
  const { page } = usePage();
  const { isLoading, onRemovePage } =
    useRemovePage();

  return (
    <MenuItem
      icon={<Icon name="trash" />}
      color="red.500"
      onClick={() => onRemovePage(page?.id || "")}
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "removePage",
      })}
    </MenuItem>
  );
};
