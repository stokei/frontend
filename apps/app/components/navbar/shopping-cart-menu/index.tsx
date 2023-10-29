import { useShoppingCart } from "@/hooks";
import { Box, Circle, IconButton, Indicator } from "@stokei/ui";
import { FC } from "react";
import { ShoppingCartDrawer } from "../shopping-cart-drawer";

export interface ShoppingCartMenuProps {}
export const ShoppingCartMenu: FC<ShoppingCartMenuProps> = () => {
  const { onToggleShoppingCart, shoppingCartItems } = useShoppingCart();

  return (
    <>
      <ShoppingCartDrawer />
      <Box position="relative">
        {shoppingCartItems?.length > 0 && (
          <Indicator placement="top-end">
            <Circle size="4" bg="red.200" color="red.600" fontSize="xs">
              {shoppingCartItems?.length}
            </Circle>
          </Indicator>
        )}
        <IconButton
          name="cart"
          variant="ghost"
          onClick={onToggleShoppingCart}
        />
      </Box>
    </>
  );
};
