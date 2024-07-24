import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { SimpleGrid } from "@stokei/ui";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: GeneralProductFragment[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
