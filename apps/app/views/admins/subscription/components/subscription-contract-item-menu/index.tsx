import { useTranslations } from "@/hooks";
import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@stokei/ui";
import { FC } from "react";
import {
  CancelSubscriptionContractModal,
  CancelSubscriptionContractModalCustomer,
  CancelSubscriptionContractModalProduct,
} from "../cancel-subscription-contract-modal";

interface SubscriptionContractItemMenuProps {
  readonly subscriptionContractId?: string;
  readonly customer?: CancelSubscriptionContractModalCustomer;
  readonly product?: CancelSubscriptionContractModalProduct;
}

export const SubscriptionContractItemMenu: FC<
  SubscriptionContractItemMenuProps
> = ({ subscriptionContractId, customer, product }) => {
  const {
    isOpen: isOpenCancelSubscriptionContractModal,
    onOpen: onOpenCancelSubscriptionContractModal,
    onClose: onCloseCancelSubscriptionContractModal,
  } = useDisclosure();
  const translate = useTranslations();

  return (
    <>
      <Menu>
        <MenuButton
          padding="2"
          rounded="md"
          alignItems="center"
          justifyContent="center"
          _hover={{
            background: "background.200",
          }}
        >
          <Icon name="menuEllipsisHorizontal" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenCancelSubscriptionContractModal}>
            <Text color="red.500">
              {translate.formatMessage({ id: "unsubscribe" })}
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <CancelSubscriptionContractModal
        customer={customer}
        product={product}
        isOpen={isOpenCancelSubscriptionContractModal}
        subscriptionContractId={subscriptionContractId}
        onClose={onCloseCancelSubscriptionContractModal}
      />
    </>
  );
};
