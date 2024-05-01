import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonProps,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@stokei/ui";

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

export const SubscriptionContractItemMenu = ({
  subscriptionContractId,
  customer,
  product,
}: SubscriptionContractItemMenuProps) => {
  const {
    isOpen: isOpenCancelSubscriptionContractModal,
    onOpen: onOpenCancelSubscriptionContractModal,
    onClose: onCloseCancelSubscriptionContractModal,
  } = useDisclosure();
  const translate = useTranslations();

  const buttonProps: ButtonProps = {
    size: "sm",
    rightIcon: <Icon name="caretDown" />,
  };

  return (
    <>
      <Menu variant="">
        <MenuButton as={Button} {...buttonProps}>
          {translate.formatMessage({ id: "actions" })}
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
