import { SelectItem } from "@stokei/ui";

import { Bank } from "..";
import { BankSelectItemContent } from "../bank-select-item-content";

interface BankSelectItemProps {
  readonly bank?: Bank;
}

export const BankSelectItem = ({ bank }: BankSelectItemProps) => {
  return (
    <SelectItem value={bank}>
      <BankSelectItemContent bank={bank} />
    </SelectItem>
  );
};
