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
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import defaultNoImage from "../../../../assets/no-image.png";
import { SelectPrice } from "../../../../components";
import { PriceComponentFragment } from "../../../../components/price/price.fragment.graphql.generated";
import { useTranslations } from "../../../../hooks";
import { BuilderComponentCatalogItemProductFragment } from "../../graphql/catalog-items.query.graphql.generated";

export interface CatalogItemProps {
  readonly productId?: string;
  readonly name?: string;
  readonly avatar?: string;
  readonly avatarURL?: string;
  readonly parent?: BuilderComponentCatalogItemProductFragment["parent"] | null;
  readonly defaultPrice?: PriceComponentFragment | null;
  readonly prices?: BuilderComponentCatalogItemProductFragment["prices"];
}

export const CatalogItem = memo(
  ({
    productId,
    avatar,
    name,
    defaultPrice,
    parent,
    prices,
  }: CatalogItemProps) => {
    const [currentPrice, setCurrentPrice] = useState<
      PriceComponentFragment | undefined | null
    >();
    const translate = useTranslations();
    const isAvailable = !!defaultPrice;

    const course = useMemo(
      () => (parent?.__typename === "Course" ? parent : null),
      [parent]
    );

    useEffect(() => {
      if (defaultPrice) {
        setCurrentPrice(defaultPrice || undefined);
      }
    }, [defaultPrice]);

    const goToProductDetails = useCallback(() => {
      router.push({
        pathname: routes.product.home({ product: productId || "" }),
        query: {
          price: currentPrice?.id,
        },
      });
    }, [currentPrice?.id, productId]);

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
            <Box
              position="absolute"
              transform="rotate(45deg)"
              right="-7"
              top="3"
            >
              <Badge variant="solid" width="24">
                {defaultPrice?.discountPercent}% OFF
              </Badge>
            </Box>
          )}
        </CardHeader>
        <CardBody>
          <Box width="full" flexDirection="column" height="full">
            <Title size="md" marginBottom="5">
              {name}
            </Title>
            <Stack spacing="3" direction="column">
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
                {!!prices?.items?.length && (
                  <SelectPrice
                    size="lg"
                    showLabel={false}
                    onChooseCurrentPrice={onChoosePrice}
                    onRemoveChooseCurrentPrice={onChoosePrice}
                    prices={prices?.items}
                    currentPrice={currentPrice}
                  />
                )}
              </Box>
              <Button
                width="full"
                onClick={goToProductDetails}
                isDisabled={!isAvailable}
              >
                {translate.formatMessage({
                  id: isAvailable ? "buyNow" : "unavailable",
                })}
              </Button>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    );
  }
);

CatalogItem.displayName = "CatalogItem";
