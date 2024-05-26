import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { SelectItem } from "@stokei/ui";

import { PriceSelectItemContent } from "../price-select-item-content";

interface PriceSelectItemProps {
  readonly price?: PriceComponentFragment;
}

export const PriceSelectItem = ({ price }: PriceSelectItemProps) => {
  return (
    <SelectItem value={price}>
      <PriceSelectItemContent price={price} />
    </SelectItem>
  );
};
