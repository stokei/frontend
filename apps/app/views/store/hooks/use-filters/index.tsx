import { ProductType } from "@/constants/product-type";
import { appRoutes } from "@stokei/routes";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export interface StoreFilters {
  page?: number;
  productName?: string;
  catalog?: string;
}

export const useStoreFilters = () => {
  const router = useRouter();

  const filters = useMemo(() => {
    const page = router.query?.page?.toString()
      ? parseInt(router.query?.page?.toString())
      : 0;
    return {
      ...router.query,
      page: !isNaN(page) ? page : 0,
    } as StoreFilters;
  }, [router.query]);

  const onChangeFilter = useCallback(
    (newFilters: Partial<StoreFilters>) => {
      if ((newFilters as any)?.slug) {
        delete (newFilters as any).slug;
      }
      if ((filters as any)?.slug) {
        delete (filters as any).slug;
      }
      return router.replace({
        pathname: appRoutes.store.home,
        query: {
          ...filters,
          ...newFilters,
        },
      });
    },
    [filters, router]
  );

  const onClearFilter = useCallback(() => {
    return router.replace(appRoutes.store.home);
  }, [router]);

  return {
    filters,
    onClearFilter,
    onChangeFilter,
  };
};
