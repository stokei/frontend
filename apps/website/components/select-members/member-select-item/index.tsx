import { Avatar, Box, SelectItem, Stack, Text } from "@stokei/ui";
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
          <Box flexDirection="column">
            <Text fontWeight="bold">{member?.fullname}</Text>
            <Text fontSize="xs">{member?.email}</Text>
          </Box>
        </Stack>
      </SelectItem>
    );
  }
);

MemberSelectItem.displayName = "MemberSelectItem";
