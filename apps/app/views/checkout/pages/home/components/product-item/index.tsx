import { memo, useCallback } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { SelectPrice } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { SortedItemComponentCatalogItemProductFragment } from "@/components/sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";
import { useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Icon,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";

export interface ProductItemProps {
  readonly price?: PriceComponentFragment | null;
  readonly product?: SortedItemComponentCatalogItemProductFragment | null;
}

export const ProductItem = memo(({ product, price }: ProductItemProps) => {
  const translate = useTranslations();

  const { onRemoveShoppingCartItem, onAddOrUpdateShoppingCartItem } =
    useShoppingCart();

  const onChoosePrice = useCallback(
    (currentPrice?: PriceComponentFragment) =>
      onAddOrUpdateShoppingCartItem({
        price: currentPrice,
        product: {
          id: product?.id || "",
          name: product?.name || "",
          avatarURL: product?.avatar?.file?.url || "",
        },
      }),
    [onAddOrUpdateShoppingCartItem, product]
  );

  return (
    <Card>
      <CardBody>
        <Stack direction="column" spacing="5">
          <Stack direction="row" spacing="5" align="center">
            <Image
              width={["20", "20", "28", "28"]}
              src={product?.avatar?.file?.url || ""}
              fallbackSrc={defaultNoImage.src}
              alt={translate.formatMessage({ id: "course" })}
            />
            <Link
              as={NextLink}
              href={routes.product.home({
                product: product?.id || "",
              })}
            >
              <Title fontSize={["md", "md", "lg", "lg"]} color="inherit">
                {product?.name}
              </Title>
            </Link>
          </Stack>

          {!!product?.prices?.items?.length && (
            <SelectPrice
              size="md"
              showLabel={false}
              onChooseCurrentPrice={onChoosePrice}
              onRemoveChooseCurrentPrice={onChoosePrice}
              prices={product?.prices?.items}
              currentPrice={price}
            />
          )}

          <ButtonGroup justifyContent="flex-end">
            <Button
              leftIcon={<Icon name="trash" />}
              variant="ghost"
              colorScheme="red"
              onClick={() => onRemoveShoppingCartItem(product?.id || "")}
            >
              {translate.formatMessage({ id: "remove" })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
});

ProductItem.displayName = "ProductItem";
