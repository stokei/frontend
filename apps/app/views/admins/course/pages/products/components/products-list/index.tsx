import { FC } from "react";
import { AdminCoursePageProductFragment } from "../../graphql/products.query.graphql.generated";
import { ProductItem } from "../product-item";

interface ProductsListProps {
  readonly products?: AdminCoursePageProductFragment[];
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </>
  );
};
