import { useShoppingCart, useTranslations } from "@/hooks";
import { Box, Circle, Icon, Indicator, NavbarNavLink, Text } from "@stokei/ui";
import { FC } from "react";
import { ShoppingCartDrawer } from "../shopping-cart-drawer";

export interface ShoppingCartMenuProps {}
export const ShoppingCartMenu: FC<ShoppingCartMenuProps> = () => {
  const translate = useTranslations();
  const { onToggleShoppingCart, shoppingCartItems } = useShoppingCart();

  return (
    <>
      <ShoppingCartDrawer />
      <Box width="50" position="relative">
        {shoppingCartItems?.length > 0 && (
          <Indicator placement="top-end">
            <Circle size="4" bg="red.200" color="red.600" fontSize="xs">
              {shoppingCartItems?.length}
            </Circle>
          </Indicator>
        )}
        <NavbarNavLink
          icon="cart"
          onClick={(e) => {
            e.preventDefault();
            onToggleShoppingCart();
          }}
        />
      </Box>
    </>
  );
};
