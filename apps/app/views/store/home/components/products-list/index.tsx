import { SortedItemComponentCatalogItemProductFragment } from "@/components/sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";
import { SimpleGrid } from "@stokei/ui";

import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: SortedItemComponentCatalogItemProductFragment[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 4]} spacing="5">
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
