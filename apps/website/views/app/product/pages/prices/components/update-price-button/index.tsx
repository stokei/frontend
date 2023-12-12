import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { Icon, MenuItem, useDisclosure } from "@stokei/ui";
import { FC } from "react";
import { UpdatePriceDrawer } from "../update-price-drawer";

interface UpdatePriceButtonProps {
  price?: PriceComponentFragment;
  onSuccessPriceUpdated: () => void;
}

export const UpdatePriceButton: FC<UpdatePriceButtonProps> = ({
  price,
  onSuccessPriceUpdated,
}) => {
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
