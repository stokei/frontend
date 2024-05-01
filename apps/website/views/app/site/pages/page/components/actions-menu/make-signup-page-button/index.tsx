import { usePage, useTranslations } from "@/hooks";
import { Icon, MenuItem } from "@stokei/ui";
import { useMakeDefaultPages } from "../../../hooks/use-make-default-pages";

export const MakeSignUpPageButton = () => {
  const translate = useTranslations();
  const { page } = usePage();
  const { isLoading, onMakeSignUpPage } =
    useMakeDefaultPages();

  return (
    <MenuItem
      icon={<Icon name="page" />}
      onClick={() => onMakeSignUpPage(page?.id || "")}
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "makeSignUpPage",
      })}
    </MenuItem>
  );
};
