import {
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOptions
} from "@stokei/ui";
import { useTranslations } from "@/hooks";
import { PriceComponentFragment } from "../price/price.fragment.graphql.generated";
import { PriceSelectItem } from "./price-select-item";
import { PriceSelectItemContent } from "./price-select-item-content";

interface SelectPriceProps {
  readonly label?: string;
  readonly prices: PriceComponentFragment[];
  readonly currentPrice?: PriceComponentFragment | null;
  readonly isLoading?: boolean;
  readonly showLabel?: boolean;
  readonly onChange: (value?: PriceComponentFragment) => void;
}

export const SelectPrice = ({
  label,
  prices,
  currentPrice,
  isLoading,
  showLabel = true,
  onChange,
}: SelectPriceProps) => {
  const translate = useTranslations();

  return (
    <FormControl flex="3">
      {showLabel && (
        <Label htmlFor="price-select-search-input">
          {label || translate.formatMessage({ id: "price" })}
        </Label>
      )}
      <SingleSelect
        id="price-select-search-input"
        isLoading={isLoading}
        value={currentPrice}
        onChange={onChange}
        marginBottom="2"
      >
        <SingleSelectButton
          placeholder={label || translate.formatMessage({ id: "price" })}
          item={(item) => <PriceSelectItemContent price={item} />}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            {prices?.map((price) => (
              <PriceSelectItem key={price.id} price={price} />
            ))}
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
