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

import { Price } from "@stokei/builder";
import { websiteRoutes } from "@stokei/routes";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

export interface ProductItemProps {
  readonly product: GeneralProductFragment;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const editProductURL = websiteRoutes
    .app({ appId: currentApp?.id })
    .product({ product: product?.id }).home;

  const course = useMemo(
    () => (product?.externalReference?.__typename === "Course" ? product?.externalReference : null),
    [product]
  );

  return (
    <Link width="full" as={NextLink} href={editProductURL}>
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
