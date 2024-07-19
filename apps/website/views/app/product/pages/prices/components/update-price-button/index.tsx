import { PriceComponentFragment } from "@stokei/builder";
import { useTranslations } from "@/hooks";
import { Icon, MenuItem, useDisclosure } from "@stokei/ui";

import { UpdatePriceDrawer } from "../update-price-drawer";

interface UpdatePriceButtonProps {
  price?: PriceComponentFragment;
  onSuccessPriceUpdated: () => void;
}

export const UpdatePriceButton = ({
  price,
  onSuccessPriceUpdated,
}: UpdatePriceButtonProps) => {
  const translate = useTranslations();
  const {
    isOpen: isOpenUpdatePriceDrawer,
    onClose: onCloseUpdatePriceDrawer,
    onOpen: onOpenUpdatePriceDrawer,
  } = useDisclosure();

  return (
    <>
      <UpdatePriceDrawer
        price={price}
        isOpenDrawer={isOpenUpdatePriceDrawer}
        onCloseDrawer={onCloseUpdatePriceDrawer}
        onSuccess={onSuccessPriceUpdated}
      />
      <MenuItem icon={<Icon name="edit" />} onClick={onOpenUpdatePriceDrawer}>
        {translate.formatMessage({
          id: "edit",
        })}
      </MenuItem>
    </>
  );
};
