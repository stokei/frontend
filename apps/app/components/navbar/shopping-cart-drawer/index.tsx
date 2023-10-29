import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { useShoppingCart, useTranslations } from "@/hooks";
import NextLink from "next/link";
import { routes } from "@/routes";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

export interface ShoppingCartDrawerProps {}
export const ShoppingCartDrawer: FC<ShoppingCartDrawerProps> = () => {
  const {
    currency,
    totalAmount,
    subtotalAmount,
    isOpenShoppingCart,
    shoppingCartItems,
    onToggleShoppingCart,
    onClearShoppingCart,
    onRemoveShoppingCartItem,
  } = useShoppingCart();
  const router = useRouter();
  const translate = useTranslations();

  const onBuyAndCloseModal = useCallback(() => {
    onToggleShoppingCart?.();
    return router.push(routes.checkout.home({}));
  }, [onToggleShoppingCart, router]);

  return (
    <Drawer isOpen={!!isOpenShoppingCart} onClose={onToggleShoppingCart}>
      <DrawerHeader>
        {translate.formatMessage({ id: "shoppingCart" })}
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          {!shoppingCartItems?.length ? (
            <Text lineHeight="shorter">
              {translate.formatMessage({ id: "shoppingCartItemsNotFound" })}
            </Text>
          ) : (
            <>
              {shoppingCartItems?.map((shoppingCartItem) => (
                <Stack
                  key={shoppingCartItem?.product?.id}
                  direction="row"
                  spacing="5"
                  align="center"
                >
                  <Image
                    width="20"
                    src={shoppingCartItem?.product?.avatarURL || ""}
                    fallbackSrc={defaultNoImage.src}
                    alt={translate.formatMessage({ id: "course" })}
                  />
                  <Stack direction="column" spacing="1">
                    <Link
                      as={NextLink}
                      href={routes.product.home({
                        product: shoppingCartItem?.product?.id,
                      })}
                    >
                      <Title fontSize="md">
                        {shoppingCartItem?.product?.name}
                      </Title>
                    </Link>
                    <Price price={shoppingCartItem?.price} />
                  </Stack>
                  <IconButton
                    name="trash"
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() =>
                      onRemoveShoppingCartItem(shoppingCartItem?.product?.id)
                    }
                  />
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Stack direction="column" spacing="1">
          <Stack direction="row" spacing="1" align="center">
            <Text lineHeight="shorter">
              {translate.formatMessage({ id: "subtotal" })}:
            </Text>
            <Title
              fontSize="md"
              textDecoration="line-through"
              color="text.400"
              lineHeight="shorter"
            >
              {translate.formatMoney({
                amount: subtotalAmount,
                currency: currency?.id || "",
                minorUnit: currency?.minorUnit,
                showSymbol: true,
              })}
            </Title>
          </Stack>
          <Stack direction="column" spacing="1">
            <Text fontWeight="bold" lineHeight="shorter">
              {translate.formatMessage({ id: "total" })}:
            </Text>
            <Stack
              width="fit-content"
              direction="row"
              align="center"
              justify="center"
            >
              <Text fontSize="md" fontWeight="600">
                {currency?.symbol}
              </Text>
              <Text
                fontSize="3xl"
                color="primary.500"
                fontWeight="900"
                lineHeight="shorter"
              >
                {translate.formatMoney({
                  amount: totalAmount,
                  currency: currency?.id || "",
                  minorUnit: currency?.minorUnit,
                })}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <ButtonGroup>
          <Button
            variant="ghost"
            onClick={onClearShoppingCart}
            isDisabled={!shoppingCartItems?.length}
          >
            {translate.formatMessage({ id: "clear" })}
          </Button>
          <Button
            onClick={onBuyAndCloseModal}
            isDisabled={!shoppingCartItems?.length}
          >
            {translate.formatMessage({ id: "buy" })}
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>
  );
};
