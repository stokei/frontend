import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { SelectItem } from "@stokei/ui";

import { PriceSelectItemContent } from "../price-select-item-content";

interface PriceSelectItemProps {
  readonly price?: PriceComponentFragment;
  readonly size?: "md" | "lg";
}

export const PriceSelectItem = ({ price, size }: PriceSelectItemProps) => {
  return (
    <SelectItem value={price}>
      <PriceSelectItemContent price={price} size={size} />
    </SelectItem>
  );
};
