import { SingleSelectOption } from "@stokei/ui";
import { PriceComponentFragment } from "../../price/price.fragment.graphql.generated";

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

PriceSelectItem.displayName = "PriceSelectItem";
