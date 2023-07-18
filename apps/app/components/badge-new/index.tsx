import { useTranslations } from "@/hooks";
import { Badge } from "@stokei/ui";
import { FC } from "react";

export interface BadgeNewProps {}
export const BadgeNew: FC<BadgeNewProps> = ({ ...props }) => {
  const translate = useTranslations();
  return (
    <Badge background="red.500" color="white.500" variant="solid" {...props}>
      {translate.formatMessage({ id: "new" })}
    </Badge>
  );
};
