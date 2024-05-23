import { useTranslations } from "@/hooks";
import {
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle
} from "@stokei/ui";

export const ChartEmptyState = () => {
  const translate = useTranslations();
  return (
    <NotFound flex="1">
      <NotFoundIcon
        name="dashboard"
      />
      <NotFoundSubtitle>{translate.formatMessage({ id: 'dataNotFound' })}</NotFoundSubtitle>
    </NotFound>
  );
};
