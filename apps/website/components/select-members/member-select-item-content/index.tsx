import { Avatar, Box, Stack, Text } from "@stokei/ui";
import { FC } from "react";
import { AppAccountFragment } from "../graphql/accounts.query.graphql.generated";

interface MemberSelectItemContentProps {
  readonly member?: AppAccountFragment;
}

export const MemberSelectItemContent: FC<MemberSelectItemContentProps> = ({
  member,
}) => {
  return (
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
  );
};
