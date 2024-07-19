import { CatalogItem } from "@stokei/builder";
import { StoreProductFragment } from "../../graphql/products.query.graphql.generated";

export interface ProductItemProps {
  readonly product: StoreProductFragment;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <CatalogItem
      product={product}
    />
  );
};
