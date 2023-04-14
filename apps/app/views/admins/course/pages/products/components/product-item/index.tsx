import { useTranslations } from "@/hooks";
import { Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";

import { useRouter } from "next/router";
import { AdminCoursePageProductFragment } from "../../graphql/products.query.graphql.generated";

export interface ProductItemProps {
  readonly product: AdminCoursePageProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Stack direction="row" spacing="5" marginRight="5">
      <Text>{product?.name}</Text>
    </Stack>
  );
});

ProductItem.displayName = "ProductItem";
