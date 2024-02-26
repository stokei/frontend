import { useShoppingCart } from "@/hooks";
import { Box, Circle, Indicator, NavbarNavLink } from "@stokei/ui";
import { ShoppingCartDrawer } from "../shopping-cart-drawer";

export const ShoppingCartMenu = () => {
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
