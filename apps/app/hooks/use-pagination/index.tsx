import { useCallback, useState } from "react";

const INITIAL_PAGE = 1;

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const onChangePage = useCallback((page?: number) => {
    setCurrentPage(page && page > 0 ? page : INITIAL_PAGE);
  }, []);

  return {
    currentPage,
    onChangePage,
  };
};
