import { Avatar, SelectItem, Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";

interface CustomerSelectItemProps {
  readonly customerId: string;
  readonly name: string;
  readonly avatarURL: string;
}

export const CustomerSelectItem: FC<CustomerSelectItemProps> = memo(
  ({ customerId, name, avatarURL }) => {
    return (
      <SelectItem value={customerId}>
        <Stack direction="row" spacing="4" align="center">
          <Avatar size="sm" src={avatarURL} name={name} />
          <Text fontWeight="bold">{name}</Text>
        </Stack>
      </SelectItem>
    );
  }
);

CustomerSelectItem.displayName = "CustomerSelectItem";
