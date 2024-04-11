import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { useShoppingCart } from "@stokei/builder";
import { useRouter } from "next/router";
import { SelectPrice } from "../select-price";

export interface CatalogItemProps {
  readonly productId?: string;
  readonly name?: string;
  readonly avatar?: string;
  readonly avatarURL?: string;
  readonly defaultPrice?: PriceComponentFragment | null;
  readonly prices?: PriceComponentFragment[];
}

export const CatalogItem = ({
  productId,
  avatar,
  name,
  defaultPrice,
  prices,
}: CatalogItemProps) => {
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();

  const router = useRouter();
  const translate = useTranslations();
  const { onAddOrUpdateShoppingCartItem } = useShoppingCart();

  const isAvailable = useMemo(() => !!prices?.length, [prices?.length]);

  const productURL = useMemo(
    () =>
      appRoutes.product.home({
        product: productId || "",
        price: currentPrice?.id,
      }),
    [currentPrice?.id, productId]
  );

  useEffect(() => {
    if (defaultPrice) {
      setCurrentPrice(defaultPrice || undefined);
    }
  }, [defaultPrice]);

  const goToProductDetails = useCallback(() => {
    router.push(productURL);
  }, [productURL, router]);

  const onChoosePrice = useCallback((price?: PriceComponentFragment) => {
    setCurrentPrice(price || null);
  }, []);

  return (
    <Card background="background.50">
      <CardHeader
        position="relative"
        padding="0"
        borderTopRadius="md"
        overflow="hidden"
      >
        <Image
          width="full"
          src={avatar}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />
        {defaultPrice?.discountPercent && (
          <Box position="absolute" transform="rotate(45deg)" right="-7" top="3">
            <Badge variant="solid" width="24">
              {defaultPrice?.discountPercent}% OFF
            </Badge>
          </Box>
        )}
      </CardHeader>
      <CardBody display="flex" flexDirection="column" justifyContent="flex-end">
        <Stack spacing="5" direction="column">
          <Link width="fit-content" as={NextLink} href={productURL}>
            <Title size="md" color="inherit">
              {name}
            </Title>
          </Link>
          <Stack spacing="3" direction="column">
            <Box>
              {!!prices?.length && (
                <SelectPrice
                  size="lg"
                  showLabel={false}
                  onChooseCurrentPrice={onChoosePrice}
                  onRemoveChooseCurrentPrice={onChoosePrice}
                  prices={prices}
                  currentPrice={currentPrice}
                />
              )}
            </Box>
            <ButtonGroup>
              <Button
                width="full"
                isDisabled={!isAvailable}
                leftIcon={<Icon name="cart" />}
                onClick={() =>
                  onAddOrUpdateShoppingCartItem({
                    price: currentPrice,
                    product: {
                      id: productId || "",
                      name: name || "",
                      avatarURL: avatar,
                    },
                  })
                }
              >
                {translate.formatMessage({
                  id: isAvailable ? "addToCart" : "unavailable",
                })}
              </Button>
              <IconButton
                name="view"
                variant="ghost"
                onClick={goToProductDetails}
              />
            </ButtonGroup>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
