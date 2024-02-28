import { SelectItem } from "@stokei/ui";

import { AppAccountFragment } from "../graphql/accounts.query.graphql.generated";
import { MemberSelectItemContent } from "../member-select-item-content";

interface MemberSelectItemProps {
  readonly member?: AppAccountFragment;
}

export const MemberSelectItem = ({ member }: MemberSelectItemProps) => {
  return (
    <SelectItem value={member}>
      <MemberSelectItemContent member={member} />
    </SelectItem>
  );
};
