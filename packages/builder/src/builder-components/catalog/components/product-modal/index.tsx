import {
  Avatar,
  Box,
  Button,
  Icon,
  Link,
  Markdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Title
} from "@stokei/ui";
import { useBuilder, useShoppingCart, useTranslations } from "../../../../hooks";
import { BuilderComponentCatalogItemProductFragment } from "../../graphql/catalog.query.graphql.generated";
import { SelectPrice } from "../../../../components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PriceComponentFragment } from "../../../../components/price/price.fragment.graphql.generated";

interface ProductModalProps {
  readonly isOpen: boolean;
  readonly productURL: string;
  readonly product?: BuilderComponentCatalogItemProductFragment;
  readonly onClose: () => void;
}

export const ProductModal = ({ product, isOpen, productURL, onClose, ...props }: ProductModalProps) => {
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();

  const translate = useTranslations();
  const { routes } = useBuilder();

  const { onAddOrUpdateShoppingCartItem } = useShoppingCart();

  const isAvailable = useMemo(
    () => !!product?.prices?.items?.length,
    [product?.prices?.items?.length]
  );

  useEffect(() => {
    if (product?.defaultPrice) {
      setCurrentPrice(product?.defaultPrice || undefined);
    }
  }, [product?.defaultPrice]);

  const onChoosePrice = useCallback((price?: PriceComponentFragment) => {
    setCurrentPrice(price || null);
  }, []);

  const onAddToCart = useCallback(() =>
    onAddOrUpdateShoppingCartItem?.({
      price: currentPrice,
      product: {
        id: product?.id || "",
        name: product?.name || "",
        avatarURL: product?.avatar?.file?.url || "",
      },
    }),
    [
      currentPrice,
      onAddOrUpdateShoppingCartItem,
      product?.avatar?.file?.url,
      product?.id,
      product?.name
    ]);

  const onBuy = useCallback(async () => {
    await onAddToCart();
    window.open(routes.checkout(), "_blank")
  }, [onAddToCart, routes]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Stack direction="row" spacing="2" align="center">
          <Avatar
            name={product?.name}
            src={product?.avatar?.file?.url || ""}
          />
          <Stack direction="column" spacing="0">
            <Title fontSize="xl">{product?.name}</Title>
            <Link href={productURL}>{translate.formatMessage({ id: 'viewDetails' })}</Link>
          </Stack>
        </Stack>
      </ModalHeader>
      <ModalBody>
        {product?.description && (
          <Markdown text={product?.description} />
        )}
      </ModalBody>
      <ModalFooter>
        <Stack direction="column" as="section" spacing="5">
          <Box width="full">
            {!!product?.prices?.items?.length && (
              <SelectPrice
                label={translate.formatMessage({ id: "chooseYourPlan" })}
                onChange={onChoosePrice}
                prices={product?.prices?.items}
                currentPrice={currentPrice}
              />
            )}
          </Box>
          <Stack direction="column" spacing="2">
            {isAvailable && (
              <Button
                width="full"
                onClick={onBuy}
              >
                {translate.formatMessage({
                  id: "buyNow"
                })}
              </Button>
            )}
            <Button
              width="full"
              isDisabled={!isAvailable}
              leftIcon={<Icon name="cart" />}
              onClick={onAddToCart}
              variant="outline"
            >
              {translate.formatMessage({
                id: isAvailable ? "addToCart" : "unavailable",
              })}
            </Button>
          </Stack>
        </Stack>
      </ModalFooter>
    </Modal >
  );
};
