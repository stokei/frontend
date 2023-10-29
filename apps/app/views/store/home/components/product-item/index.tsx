import { FC, memo } from "react";

import { CatalogItem } from "@/components";
import { SortedItemComponentCatalogItemProductFragment } from "@/components/sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";

export interface ProductItemProps {
  readonly product: SortedItemComponentCatalogItemProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  return (
    <CatalogItem
      productId={product?.id}
      name={product?.name}
      avatar={product?.avatar?.file?.url || ""}
      defaultPrice={product?.defaultPrice}
      prices={product?.prices}
      parent={product?.parent}
    />
  );
});

ProductItem.displayName = "ProductItem";
