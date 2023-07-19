import { SelectItem } from "@stokei/ui";
import { FC, memo } from "react";
import { AppAccountFragment } from "../graphql/accounts.query.graphql.generated";
import { MemberSelectItemContent } from "../member-select-item-content";

interface MemberSelectItemProps {
  readonly member?: AppAccountFragment;
}

export const MemberSelectItem: FC<MemberSelectItemProps> = memo(
  ({ member }) => {
    return (
      <SelectItem value={member}>
        <MemberSelectItemContent member={member} />
      </SelectItem>
    );
  }
);

MemberSelectItem.displayName = "MemberSelectItem";
