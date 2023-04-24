import noImage from "@/assets/no-image.png";
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
  Link,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo, useMemo } from "react";
import defaultNoImage from "@/assets/no-image.png";

import { routes } from "@/routes";
import { CustomersProductsPageProductFragment } from "../../graphql/products.query.graphql.generated";
import { Price } from "@/components";
import { useRouter } from "next/router";

export interface ProductItemProps {
  readonly product: CustomersProductsPageProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  const router = useRouter();
  const translate = useTranslations();
  const goToCheckout = () =>
    router.push(routes.checkout.home({ product: product?.id }));

  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [product]
  );

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader position="relative" padding="0">
        <Image
          width="full"
          height="fit-content"
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
              {product?.defaultPrice && <Price price={product?.defaultPrice} />}
            </Box>
            <Button width="full" onClick={goToCheckout}>
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
});

ProductItem.displayName = "ProductItem";
