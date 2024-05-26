import { useTranslations } from "@/hooks";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectList,
} from "@stokei/ui";
import { useCallback } from "react";
import { PriceComponentFragment } from "../price/price.fragment.graphql.generated";
import { PriceSelectItem } from "./price-select-item";
import { PriceSelectItemContent } from "./price-select-item-content";

interface SelectPriceProps {
  readonly label?: string;
  readonly prices: PriceComponentFragment[];
  readonly currentPrice?: PriceComponentFragment | null;
  readonly isLoading?: boolean;
  readonly showLabel?: boolean;
  readonly onChooseCurrentPrice: (value?: PriceComponentFragment) => void;
  readonly onRemoveChooseCurrentPrice: (value?: PriceComponentFragment) => void;
}

export const SelectPrice = ({
  label,
  prices,
  currentPrice,
  isLoading,
  showLabel = true,
  onChooseCurrentPrice,
  onRemoveChooseCurrentPrice,
}: SelectPriceProps) => {
  const translate = useTranslations();

  const onChooseItem = useCallback(
    (value?: PriceComponentFragment) => {
      onChooseCurrentPrice?.(value);
    },
    [onChooseCurrentPrice]
  );
  const onRemoveChooseItem = useCallback(
    (value?: PriceComponentFragment) => {
      onRemoveChooseCurrentPrice?.(value);
    },
    [onRemoveChooseCurrentPrice]
  );

  return (
    <FormControl flex="3">
      {showLabel && (
        <Label htmlFor="price-select-search-input">
          {label || translate.formatMessage({ id: "price" })}
        </Label>
      )}
      <Select
        isLoading={isLoading}
        value={currentPrice}
        onChooseItem={onChooseItem}
        onRemoveChooseItem={onRemoveChooseItem}
        marginBottom="2"
      >
        <SelectInput
          id="price-select-search-input"
          placeholder={translate.formatMessage({
            id: "price",
          })}
          item={(item) => <PriceSelectItemContent price={item} />}
        />
        <SelectList>
          {prices?.map((price) => (
            <PriceSelectItem key={price.id} price={price} />
          ))}
        </SelectList>
      </Select>
    </FormControl>
  );
};
