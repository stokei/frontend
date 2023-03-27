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

interface SubscriptionContractItemMenuProps {
  readonly customer?: AppAccountFragment;
}

export const SubscriptionContractItemMenu: FC<SubscriptionContractItemMenuProps> =
  memo(({ customer }) => {
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
  });

SubscriptionContractItemMenu.displayName = "SubscriptionContractItemMenu";
