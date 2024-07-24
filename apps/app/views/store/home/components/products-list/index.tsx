import { SimpleGrid } from "@stokei/ui";

import { PageBuilderProvider } from "@/contexts";
import { ProductItem } from "../product-item";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface ProductsListProps {
  readonly products?: GeneralProductFragment[];
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
