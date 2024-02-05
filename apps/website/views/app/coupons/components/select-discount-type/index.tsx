import { useTranslations } from "@/hooks";
import { Select, SelectInput, SelectItem, SelectList, Text } from "@stokei/ui";
import { FC } from "react";

export enum DiscountType {
  AMOUNT = "AMOUNT",
  PERCENT = "PERCENT",
}

interface SelectDiscountTypeProps {
  readonly value: DiscountType;
  readonly onChange: (value: DiscountType) => void;
}

export const SelectDiscountType: FC<SelectDiscountTypeProps> = ({
  value,
  onChange,
}) => {
  const translate = useTranslations();

  return (
    <Select value={value} onChooseItem={onChange} onRemoveChooseItem={onChange}>
      <SelectInput
        item={(item) => (
          <Text>
            {translate.formatMessage({
              id: item === DiscountType.AMOUNT ? "amountOff" : "percentOff",
            })}
          </Text>
        )}
      />
      <SelectList>
        <SelectItem value={DiscountType.AMOUNT}>
          <Text>
            {translate.formatMessage({
              id: "amountOff",
            })}
          </Text>
        </SelectItem>
        <SelectItem value={DiscountType.PERCENT}>
          <Text>
            {translate.formatMessage({
              id: "percentOff",
            })}
          </Text>
        </SelectItem>
      </SelectList>
    </Select>
  );
};
