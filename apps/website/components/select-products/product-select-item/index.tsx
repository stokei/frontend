import { MultiSelectOption } from "@stokei/ui";

import { ProductSelectItemContent } from "../product-select-item-content";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface ProductSelectItemProps {
  readonly product?: GeneralProductFragment;
}

export const ProductSelectItem = ({ product }: ProductSelectItemProps) => {
  return (
    <MultiSelectOption value={product}>
      <ProductSelectItemContent product={product} />
    </MultiSelectOption>
  );
};
