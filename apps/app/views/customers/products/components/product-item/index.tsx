import defaultNoImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";

import { Price, SelectPrice } from "@/components";
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { CustomersProductsPageProductFragment } from "../../graphql/products.query.graphql.generated";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";

export interface ProductItemProps {
  readonly product: CustomersProductsPageProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  const [currentPrice, setCurrentPrice] =
    useState<PriceComponentFragment | null>();

  const router = useRouter();
  const translate = useTranslations();

  const goToProductDetails = useCallback(() => {
    router.push({
      pathname: routes.product.home({ product: product?.id || "" }),
      query: {
        price: currentPrice?.id,
      },
    });
  }, [currentPrice?.id, product?.id, router]);

  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [product]
  );

  useEffect(() => {
    if (product?.defaultPrice) {
      setCurrentPrice(product?.defaultPrice || undefined);
    }
  }, [product?.defaultPrice]);

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
          alt={translate.formatMessage({ id: "course" })}
        />
        {product?.defaultPrice?.discountPercent && (
          <Box position="absolute" transform="rotate(45deg)" right="-7" top="3">
            <Badge variant="solid" width="24">
              {product?.defaultPrice?.discountPercent}% OFF
            </Badge>
          </Box>
        )}
      </CardHeader>
      <CardBody>
        <Box width="full" flexDirection="column" height="full">
          <Title size="md" marginBottom="5">
            {product?.name}
          </Title>
          <Box width="full" flexDirection="column" flex="1">
            <Stack spacing="3" flex="1">
              {!!course?.instructors?.items?.length && (
                <Description>
                  {course?.instructors?.items
                    ?.map((instructor) => instructor.instructor?.fullname)
                    .join(", ")}
                </Description>
              )}
            </Stack>
            <Box marginBottom="5">
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
            <Button width="full" onClick={goToProductDetails}>
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
});

ProductItem.displayName = "ProductItem";
