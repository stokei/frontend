import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { SingleSelectOption } from "@stokei/ui";

import { PriceSelectItemContent } from "../price-select-item-content";

interface PriceSelectItemProps {
  readonly price?: PriceComponentFragment;
}

export const PriceSelectItem = ({ price }: PriceSelectItemProps) => {
  return (
    <SingleSelectOption value={price}>
      <PriceSelectItemContent price={price} />
    </SingleSelectOption>
  );
};
