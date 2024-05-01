import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useMakeDefaultPages } from "../../../hooks/use-make-default-pages";

export const MakeHomePageButton = () => {
  const translate = useTranslations();
  const { page } = usePage();
  const { isLoading, onMakeHomePage } =
    useMakeDefaultPages();

  return (
    <MenuItem
      icon={<Icon name="home" />}
      onClick={() => onMakeHomePage(page?.id || "")}
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "makeHomePage",
      })}
    </MenuItem>
  );
};
