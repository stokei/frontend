import { useRouter } from "next/router";
import { useCallback } from "react";

const INITIAL_PAGE = '1';

export const usePagination = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page?.toString() || INITIAL_PAGE, 10)

  const onChangePage = useCallback((page?: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page && page > 0 ? page + '' : INITIAL_PAGE)
    router.push(url.toString())
  }, [router]);

  return {
    currentPage,
    onChangePage,
  };
};
