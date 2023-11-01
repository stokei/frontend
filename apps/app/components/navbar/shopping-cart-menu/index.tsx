import { useShoppingCart, useTranslations } from "@/hooks";
import { Box, Button, Circle, Icon, Indicator, Text } from "@stokei/ui";
import { FC } from "react";
import { ShoppingCartDrawer } from "../shopping-cart-drawer";

export interface ShoppingCartMenuProps {}
export const ShoppingCartMenu: FC<ShoppingCartMenuProps> = () => {
  const translate = useTranslations();
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
        <Button
          leftIcon={<Icon name="cart" />}
          variant="ghost"
          onClick={onToggleShoppingCart}
        >
          <Text display={["none", "none", "block", "block"]} color="inherit">
            {translate.formatMessage({ id: "shoppingCart" })}
          </Text>
        </Button>
      </Box>
    </>
  );
};
