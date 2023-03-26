import { Avatar, SelectItem, Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";
import { AppAccountFragment } from "../../graphql/accounts.query.graphql.generated";

interface CustomerSelectItemProps {
  readonly customer?: AppAccountFragment;
}

export const CustomerSelectItem: FC<CustomerSelectItemProps> = memo(
  ({ customer }) => {
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
