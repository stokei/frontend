import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { GetProductPlansQuery } from "../../graphql/plans.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  products?: GetProductPlansQuery["products"];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 3]} spacing="5">
      {products?.items?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
