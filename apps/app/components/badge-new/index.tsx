import { useTranslations } from "@/hooks";
import { Badge } from "@stokei/ui";

export interface BadgeNewProps {}
export const BadgeNew = ({ ...props }: BadgeNewProps) => {
  const translate = useTranslations();
  return (
    <Badge background="red.500" color="white.500" variant="solid" {...props}>
      {translate.formatMessage({ id: "new" })}
    </Badge>
  );
};
