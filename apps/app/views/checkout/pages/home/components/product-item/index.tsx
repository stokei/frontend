import { useCallback } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { Price, PriceComponentFragment } from "@stokei/builder";
import { useTranslations } from "@/hooks";
import { CheckoutProductFragment } from "@/views/checkout/graphql/product.query.graphql.generated";
import { useShoppingCart } from "@stokei/builder";
import { appRoutes } from "@stokei/routes";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Icon,
  Image,
  Link,
  RadioCard,
  RadioGroup,
  Stack,
  Title
} from "@stokei/ui";
import NextLink from "next/link";

export interface ProductItemProps {
  readonly price?: PriceComponentFragment | null;
  readonly product?: CheckoutProductFragment | null;
}

export const ProductItem = ({ product, price }: ProductItemProps) => {
  const translate = useTranslations();

  const { onRemoveShoppingCartItem, onAddOrUpdateShoppingCartItem } =
    useShoppingCart();

  const onChoosePrice = useCallback(
    (priceId: string) => {
      const priceToAdd = product?.prices?.items?.find(
        (productPrice) => productPrice?.id === priceId
      );
      return onAddOrUpdateShoppingCartItem?.({
        price: priceToAdd,
        product: {
          id: product?.id || "",
          name: product?.name || "",
          avatarURL: product?.avatar?.file?.url || "",
        },
      })
    },
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
              href={appRoutes.product.home({
                product: product?.id || "",
              })}
            >
              <Title fontSize={["md", "md", "lg", "lg"]} color="inherit">
                {product?.name}
              </Title>
            </Link>
          </Stack>

          {!!product?.prices?.items?.length && (
            <RadioGroup value={price?.id} onChange={onChoosePrice}>
              <Stack spacing="5" direction="column">
                {product?.prices?.items?.map((currentPrice) => (
                  <RadioCard
                    key={currentPrice?.id}
                    id={currentPrice?.id}
                    value={currentPrice?.id}
                    isChecked={currentPrice?.id === price?.id}
                  >
                    <Stack direction="column" spacing="3">
                      {currentPrice?.nickname && (
                        <Title fontSize="md">{currentPrice?.nickname}</Title>
                      )}
                      <Price price={currentPrice} withUnitDescription />
                    </Stack>
                  </RadioCard>
                ))}
              </Stack>
            </RadioGroup>
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
};
