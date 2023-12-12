import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { Menu, MenuButton, MenuList } from "@stokei/ui";
import { FC, memo } from "react";
import { ActionsButton } from "../actions-button";
import { ActivatePriceButton } from "../activate-price-button";
import { DeactivatePriceButton } from "../deactivate-price-button";
import { MakeDefaultPriceButton } from "../make-default-price-button";
import { UpdatePriceButton } from "../update-price-button";

interface ActionsMenuProps {
  isDefaultPrice?: boolean;
  price?: PriceComponentFragment;
  onSuccessPriceUpdated: () => void;
  onSuccessPriceActivated: (price?: PriceComponentFragment) => void;
  onSuccessPriceDeactivated: (price?: PriceComponentFragment) => void;
}

export const ActionsMenu: FC<ActionsMenuProps> = ({
  price,
  isDefaultPrice,
  onSuccessPriceUpdated,
  onSuccessPriceActivated,
  onSuccessPriceDeactivated,
}) => {
  const translate = useTranslations();

  return (
    <Menu>
      <MenuButton as={ActionsButton}>
        {translate.formatMessage({ id: "actions" })}
      </MenuButton>
      <MenuList>
        <UpdatePriceButton
          price={price}
          onSuccessPriceUpdated={onSuccessPriceUpdated}
        />
        {!isDefaultPrice && (
          <>
            {price?.active ? (
              <>
                <MakeDefaultPriceButton
                  priceId={price?.id || ""}
                  productId={price?.parent || ""}
                  onSuccess={onSuccessPriceUpdated}
                />
                {!isDefaultPrice && (
                  <DeactivatePriceButton
                    priceId={price?.id}
                    onSuccess={onSuccessPriceDeactivated}
                  />
                )}
              </>
            ) : (
              <ActivatePriceButton
                priceId={price?.id}
                onSuccess={onSuccessPriceActivated}
              />
            )}
          </>
        )}
      </MenuList>
    </Menu>
  );
};
