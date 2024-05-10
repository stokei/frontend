import { CatalogItem } from "@/components";
import { StoreProductFragment } from "../../graphql/products.query.graphql.generated";

export interface ProductItemProps {
  readonly product: StoreProductFragment;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <CatalogItem
      productId={product?.id}
      name={product?.name}
      avatarURL={product?.avatar?.file?.url || ""}
      defaultPrice={product?.defaultPrice}
      prices={product?.prices?.items || []}
    />
  );
};
