import { MultiSelectOption } from "@stokei/ui";

import { AppAccountFragment } from "../graphql/accounts.query.graphql.generated";
import { MemberSelectItemContent } from "../member-select-item-content";

interface MemberSelectItemProps {
  readonly member?: AppAccountFragment;
}

export const MemberSelectItem = ({ member }: MemberSelectItemProps) => {
  return (
    <MultiSelectOption value={member}>
      <MemberSelectItemContent member={member} />
    </MultiSelectOption>
  );
};
