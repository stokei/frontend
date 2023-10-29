import { ProductType } from "@/constants/product-type";
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export interface StoreFilters {
  productType?: ProductType;
  productName?: string;
  catalog?: string;
}

export const useStoreFilters = () => {
  const router = useRouter();

  const filters = useMemo(() => {
    return router.query as StoreFilters;
  }, [router.query]);

  const onChangeFilter = useCallback(
    (newFilters: Partial<StoreFilters>) => {
      return router.replace({
        pathname: routes.store.home,
        query: {
          ...filters,
          ...newFilters,
        },
      });
    },
    [filters, router]
  );

  return {
    filters,
    onChangeFilter,
  };
};
