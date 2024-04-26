import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useMakeDefaultPages } from "../../../hooks/use-make-default-pages";

export const MakeLoginPageButton = () => {
  const translate = useTranslations();
  const { page } = usePage();
  const { isLoading, onMakeLoginPage } =
    useMakeDefaultPages();

  return (
    <MenuItem
      icon={<Icon name="page" />}
      onClick={() => onMakeLoginPage(page?.id || "")}
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "makeLoginPage",
      })}
    </MenuItem>
  );
};
