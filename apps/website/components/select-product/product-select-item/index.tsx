import { MultiSelectOption } from "@stokei/ui";

import { AppProductFragment } from "../graphql/products.query.graphql.generated";
import { ProductSelectItemContent } from "../product-select-item-content";

interface ProductSelectItemProps {
  readonly product?: AppProductFragment;
}

export const ProductSelectItem = ({ product }: ProductSelectItemProps) => {
  return (
    <MultiSelectOption value={product}>
      <ProductSelectItemContent product={product} />
    </MultiSelectOption>
  );
};
