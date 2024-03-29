import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { useShoppingCart, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
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
  const { isAuthenticated } = useCurrentAccount();

  const onBuyAndCloseModal = useCallback(() => {
    onToggleShoppingCart?.();

    if (!isAuthenticated) {
      router.push({
        pathname: routes.auth.login,
        query: { redirectTo: routes.checkout.home },
      });
      return;
    }

    return router.push(routes.checkout.home);
  }, [isAuthenticated, onToggleShoppingCart, router]);

  const goToProductDetails = useCallback(
    ({ productId, priceId }: { productId: string; priceId?: string }) => {
      router.push({
        pathname: routes.product.home({ product: productId || "" }),
        query: {
          price: priceId,
        },
      });
    },
    [router]
  );

  return (
    <Drawer isOpen={!!isOpenShoppingCart} onClose={onToggleShoppingCart}>
      <DrawerHeader>
        {translate.formatMessage({ id: "shoppingCart" })}
      </DrawerHeader>
      <DrawerBody paddingY="5" background="background.100">
        <Stack direction="column" spacing="5">
          {!shoppingCartItems?.length ? (
            <Text lineHeight="shorter">
              {translate.formatMessage({ id: "shoppingCartItemsNotFound" })}
            </Text>
          ) : (
            <>
              {shoppingCartItems?.map((shoppingCartItem) => (
                <Card key={shoppingCartItem?.product?.id}>
                  <CardBody>
                    <Stack direction="column" spacing="5">
                      <Stack direction="row" spacing="5" align="center">
                        <Image
                          width={["20", "20", "28", "28"]}
                          src={shoppingCartItem?.product?.avatarURL || ""}
                          fallbackSrc={defaultNoImage.src}
                          alt={translate.formatMessage({ id: "course" })}
                        />
                        <Link
                          width="fit-content"
                          as={NextLink}
                          href={routes.product.home({
                            product: shoppingCartItem?.product?.id,
                          })}
                        >
                          <Title
                            fontSize={["md", "md", "lg", "lg"]}
                            color="inherit"
                          >
                            {shoppingCartItem?.product?.name}
                          </Title>
                        </Link>
                      </Stack>
                      <Price size="md" price={shoppingCartItem?.price} />

                      <ButtonGroup
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          leftIcon={<Icon name="trash" />}
                          variant="link"
                          colorScheme="red"
                          onClick={() =>
                            onRemoveShoppingCartItem(
                              shoppingCartItem?.product?.id
                            )
                          }
                        >
                          {translate.formatMessage({ id: "remove" })}
                        </Button>
                        <Button
                          variant="link"
                          onClick={() =>
                            goToProductDetails({
                              productId: shoppingCartItem?.product?.id,
                              priceId: shoppingCartItem?.price?.id,
                            })
                          }
                        >
                          {translate.formatMessage({ id: "view" })}
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Stack direction="column" spacing="8">
          <Stack direction="column" spacing="5">
            <Stack
              direction="row"
              spacing="1"
              justify="space-between"
              align="center"
            >
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
            <Stack
              direction="row"
              spacing="1"
              justify="space-between"
              align="center"
            >
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
          <Stack direction="column" spacing="5">
            <Button
              width="full"
              onClick={onBuyAndCloseModal}
              isDisabled={!shoppingCartItems?.length}
            >
              {translate.formatMessage({ id: "buy" })}
            </Button>
            <Button
              width="full"
              variant="ghost"
              onClick={onClearShoppingCart}
              isDisabled={!shoppingCartItems?.length}
            >
              {translate.formatMessage({ id: "clear" })}
            </Button>
          </Stack>
        </Stack>
      </DrawerFooter>
    </Drawer>
  );
};
