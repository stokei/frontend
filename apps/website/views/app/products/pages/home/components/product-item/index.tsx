import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { useMemo } from "react";

import { Price } from "@/components";
import { routes } from "@/routes";
import { AdminProductPageProductFragment } from "../../graphql/products.query.graphql.generated";

export interface ProductItemProps {
  readonly product: AdminProductPageProductFragment;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const editProductURL = routes
    .app({ appId: currentApp?.id })
    .product({ product: product?.id }).home;

  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [product]
  );

  return (
    <Link as={NextLink} href={editProductURL}>
      <Card background="background.50" overflow="hidden">
        <CardHeader position="relative" padding="0">
          <Image
            width="full"
            src={product?.avatar?.file?.url || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "course" })}
          />
          {product?.defaultPrice?.discountPercent && (
            <Box
              position="absolute"
              transform="rotate(45deg)"
              right="-7"
              top="3"
            >
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
                {product?.defaultPrice && (
                  <Price price={product?.defaultPrice} />
                )}
              </Stack>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Link>
  );
};
