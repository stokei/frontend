import { Avatar, SelectItem, Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";
import { AppAccountFragment } from "../graphql/accounts.query.graphql.generated";

interface MemberSelectItemProps {
  readonly member?: AppAccountFragment;
}

export const MemberSelectItem: FC<MemberSelectItemProps> = memo(
  ({ member }) => {
    return (
      <SelectItem value={member}>
        <Stack direction="row" spacing="4" align="center">
          <Avatar
            size="sm"
            src={member?.avatar?.file?.url || ""}
            name={member?.fullname}
          />
          <Text fontWeight="bold">{member?.fullname}</Text>
        </Stack>
      </SelectItem>
    );
  }
);

MemberSelectItem.displayName = "MemberSelectItem";
