import { SimpleGrid } from "@stokei/ui";

import { PageBuilderProvider } from "@/contexts";
import { StoreProductFragment } from "../../graphql/products.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: StoreProductFragment[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <PageBuilderProvider>
      <SimpleGrid columns={[2, 2, 2, 4]} spacing="5">
        {products?.map((product) => (
          <ProductItem key={product?.id} product={product} />
        ))}
      </SimpleGrid>
    </PageBuilderProvider>
  );
};
