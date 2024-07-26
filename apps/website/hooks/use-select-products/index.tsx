import { SelectProductValue } from "@/components/select-products";
import { addOrRemoveItemFromArray } from "@stokei/utils";
import { useCallback, useState } from "react";

export const useSelectProducts = () => {
  const [products, setProducts] = useState<SelectProductValue[]>([]);

  const onChooseProduct = useCallback(
    (product?: SelectProductValue) =>
      product && setProducts((currentProducts) => addOrRemoveItemFromArray(currentProducts, product, 'id')),
    []
  );

  const onResetProduct = useCallback(() => setProducts([]), []);

  return {
    products,
    onChooseProduct,
    onResetProduct,
  };
};
