import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { SelectItem } from "@stokei/ui";
import { FC, memo } from "react";
import { PriceSelectItemContent } from "../price-select-item-content";

interface PriceSelectItemProps {
  readonly price?: PriceComponentFragment;
  readonly size?: "md" | "lg";
}

export const PriceSelectItem: FC<PriceSelectItemProps> = memo(
  ({ price, size }) => {
    return (
      <SelectItem value={price}>
        <PriceSelectItemContent price={price} size={size} />
      </SelectItem>
    );
  }
);

PriceSelectItem.displayName = "PriceSelectItem";
