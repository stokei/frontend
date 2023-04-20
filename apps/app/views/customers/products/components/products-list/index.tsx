import { FC } from "react";
import { SimpleGrid } from "@stokei/ui";
import { CustomersProductsPageProductFragment } from "../../graphql/products.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: CustomersProductsPageProductFragment[];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
