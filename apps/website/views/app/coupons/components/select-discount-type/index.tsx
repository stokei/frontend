import { useTranslations } from "@/hooks";
import { SingleSelect, SingleSelectButton, SingleSelectCombobox, SingleSelectOption, SingleSelectOptions, Text } from "@stokei/ui";

export enum DiscountType {
  AMOUNT = "AMOUNT",
  PERCENT = "PERCENT",
}

interface SelectDiscountTypeProps {
  readonly value: DiscountType;
  readonly onChange: (value: DiscountType) => void;
}

export const SelectDiscountType = ({
  value,
  onChange,
}: SelectDiscountTypeProps) => {
  const translate = useTranslations();

  return (
    <SingleSelect
      id="discount-type"
      value={value}
      onChange={onChange}
    >
      <SingleSelectButton
        placeholder={translate.formatMessage({
          id: "discountType",
        })}
        item={(item) => (
          <Text>
            {translate.formatMessage({
              id: item === DiscountType.AMOUNT ? "amountOff" : "percentOff",
            })}
          </Text>
        )}
      />
      <SingleSelectCombobox>
        <SingleSelectOptions>
          <SingleSelectOption value={DiscountType.AMOUNT}>
            <Text>
              {translate.formatMessage({
                id: "amountOff",
              })}
            </Text>
          </SingleSelectOption>
          <SingleSelectOption value={DiscountType.PERCENT}>
            <Text>
              {translate.formatMessage({
                id: "percentOff",
              })}
            </Text>
          </SingleSelectOption>
        </SingleSelectOptions>
      </SingleSelectCombobox>
    </SingleSelect>
  );
};
