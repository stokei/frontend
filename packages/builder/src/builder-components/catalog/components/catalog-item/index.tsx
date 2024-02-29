import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Description,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { PriceComponentFragment } from "../../../../components/price/price.fragment.graphql.generated";
import { useShoppingCart, useTranslations } from "../../../../hooks";
import defaultNoImage from "../../../../assets/no-image.png";
import { BuilderComponentCatalogItemProductFragment } from "../../graphql/catalog-items.query.graphql.generated";
import { SelectPrice } from "../../../../components/select-price";

export interface CatalogItemProps {
  readonly product?: BuilderComponentCatalogItemProductFragment;
}

export const CatalogItem = ({ product }: CatalogItemProps) => {
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const translate = useTranslations();
  const { onAddOrUpdateShoppingCartItem } = useShoppingCart();

  const isAvailable = useMemo(
    () => !!product?.prices?.items?.length,
    [product?.prices?.items?.length]
  );

  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [product?.parent]
  );
  const productURL = useMemo(
    () =>
      `/products/${product?.id}${currentPrice?.id ? "?price=" + currentPrice?.id : ""}`,
    [currentPrice?.id, product?.id]
  );

  useEffect(() => {
    if (product?.defaultPrice) {
      setCurrentPrice(product?.defaultPrice || undefined);
    }
  }, [product?.defaultPrice]);

  const goToProductDetails = useCallback(() => {
    window.location.assign(productURL);
  }, [productURL]);

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
          src={product?.avatar?.file?.url || ""}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />
        {product?.defaultPrice?.discountPercent && (
          <Box position="absolute" transform="rotate(45deg)" right="-7" top="3">
            <Badge variant="solid" width="24">
              {product?.defaultPrice?.discountPercent}% OFF
            </Badge>
          </Box>
        )}
      </CardHeader>
      <CardBody display="flex" flexDirection="column" justifyContent="flex-end">
        <Stack spacing="5" direction="column">
          <Link width="fit-content" as={NextLink} href={productURL}>
            <Title size="md" color="inherit">
              {product?.name}
            </Title>
          </Link>
          <Stack spacing="3" direction="column">
            {!!course?.instructors?.items?.length && (
              <Description>
                {course?.instructors?.items
                  ?.map((instructor) => instructor.instructor?.fullname)
                  .join(", ")}
              </Description>
            )}
            <Box>
              {!!product?.prices?.items?.length && (
                <SelectPrice
                  size="lg"
                  showLabel={false}
                  onChooseCurrentPrice={onChoosePrice}
                  onRemoveChooseCurrentPrice={onChoosePrice}
                  prices={product?.prices?.items}
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
                      id: product?.id || "",
                      name: product?.name || "",
                      avatarURL: product?.avatar?.file?.url || "",
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
