import { usePage, useSite, useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { Icon, MenuItem } from "@stokei/ui";

export const VisitPageButton = () => {
  const translate = useTranslations();
  const { page } = usePage();
  const { site } = useSite();
  const onGoToPageView = () => {
    const url = (site?.defaultDomain?.url || "") + appRoutes.customPage({ slug: page?.slug || "" }).home;
    window.open(url, "_blank");
  }

  return (
    <MenuItem
      icon={<Icon name="arrowRight" />}
      onClick={onGoToPageView}
    >
      {translate.formatMessage({
        id: "viewPage",
      })}
    </MenuItem>
  );
};
