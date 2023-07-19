import { SelectItem } from "@stokei/ui";
import { FC, memo } from "react";
import { AppProductFragment } from "../graphql/products.query.graphql.generated";
import { ProductSelectItemContent } from "../product-select-item-content";

interface ProductSelectItemProps {
  readonly product?: AppProductFragment;
}

export const ProductSelectItem: FC<ProductSelectItemProps> = memo(
  ({ product }) => {
    return (
      <SelectItem value={product}>
        <ProductSelectItemContent product={product} />
      </SelectItem>
    );
  }
);

ProductSelectItem.displayName = "ProductSelectItem";
