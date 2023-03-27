import {
  Avatar,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SelectItem,
  Stack,
  Text,
} from "@stokei/ui";
import { FC, memo } from "react";
import { AppAccountFragment } from "../../graphql/accounts.query.graphql.generated";

interface CustomerSelectItemProps {
  readonly customer?: AppAccountFragment;
}

export const CustomerSelectItem: FC<CustomerSelectItemProps> = memo(
  ({ customer }) => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon name="menuEllipsis" />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<Icon name="trash" />} command="⌘T">
            Cancel
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
);

CustomerSelectItem.displayName = "CustomerSelectItem";
