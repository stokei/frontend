import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { Avatar, SelectItem, Stack, Text } from "@stokei/ui";
import { memo } from "react";

interface CustomerSelectItemProps {
  readonly customer?: AppAccountFragment;
}

export const CustomerSelectItem = memo(
  ({ customer }: CustomerSelectItemProps) => {
    return (
      <SelectItem value={customer}>
        <Stack direction="row" spacing="4" align="center">
          <Avatar
            size="sm"
            src={customer?.avatar?.file?.url || ""}
            name={customer?.fullname}
          />
          <Text fontWeight="bold">{customer?.fullname}</Text>
        </Stack>
      </SelectItem>
    );
  }
);

CustomerSelectItem.displayName = "CustomerSelectItem";
