import { Container, SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { ProductsQuery } from "../../graphql/products.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  products?: ProductsQuery["products"];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="5">
      {products?.items?.map((product) => (
        <ProductItem
          key={product?.id}
          id={product?.id}
          name={product?.name}
          avatar={product?.avatar?.file?.url || ""}
          description={product?.description}
          defaultPrice={product?.defaultPrice}
          plan={product?.plan}
          course={product?.course}
        />
      ))}
    </SimpleGrid>
  );
};
