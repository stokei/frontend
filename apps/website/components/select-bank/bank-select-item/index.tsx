import { SelectItem } from "@stokei/ui";
import { memo } from "react";
import { Bank } from "..";
import { BankSelectItemContent } from "../bank-select-item-content";

interface BankSelectItemProps {
  readonly bank?: Bank;
}

export const BankSelectItem = memo(({ bank }: BankSelectItemProps) => {
  return (
    <SelectItem value={bank}>
      <BankSelectItemContent bank={bank} />
    </SelectItem>
  );
});

BankSelectItem.displayName = "BankSelectItem";
