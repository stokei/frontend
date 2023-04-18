import noImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import { Card, CardBody, Image, Link, Stack, Text } from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo } from "react";

import { routes } from "@/routes";
import { AdminProductPageProductFragment } from "../../graphql/products.query.graphql.generated";

export interface ProductItemProps {
  readonly product: AdminProductPageProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  const translate = useTranslations();
  const editProductURL = routes.admins.product({ product: product?.id }).home;

  return (
    <Link as={NextLink} href={editProductURL}>
      <Card background="background.50">
        <CardBody>
          <Stack direction="row" spacing="4" align="center">
            <Image
              width="20"
              height="fit-content"
              src={product?.avatar?.file?.url || ""}
              fallbackSrc={noImage.src}
              alt={translate.formatMessage({ id: "product" })}
            />
            <Text fontWeight="bold">{product?.name}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
});

ProductItem.displayName = "ProductItem";
