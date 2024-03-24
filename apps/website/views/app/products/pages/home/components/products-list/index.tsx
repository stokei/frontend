import { SimpleGrid } from "@stokei/ui";
import { AdminProductPageProductFragment } from "../../graphql/products.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: AdminProductPageProductFragment[];
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
