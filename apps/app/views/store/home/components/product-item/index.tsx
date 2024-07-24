import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { CatalogItem } from "@stokei/builder";

export interface ProductItemProps {
  readonly product: GeneralProductFragment;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <CatalogItem
      product={product}
    />
  );
};
