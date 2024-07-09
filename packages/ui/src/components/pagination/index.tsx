import { useMemo } from "react";
import { Button } from "../button";
import { ButtonGroup, ButtonGroupProps } from "../button-group";
import { Icon } from "../icon";

export interface PaginationProps extends Omit<ButtonGroupProps, "children"> {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number;
  previousPage?: number;
  onChangePage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  onChangePage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
  ...props
}: PaginationProps) => {
  const pages = useMemo(() => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <ButtonGroup
      isAttached
      spacing="0"
      variant="outline"
      rounded="md"
      justifyContent="center"
      {...props}
    >
      <Button
        h="10"
        colorScheme="gray"
        paddingRight="5"
        isDisabled={!hasPreviousPage}
        background="background.50"
        onClick={hasPreviousPage ? () => onChangePage(currentPage - 1) : undefined}
      >
        <Icon name="arrowLeft" />
      </Button>
      {pages.map(page => (
        <Button
          key={page}
          h="10"
          colorScheme="gray"
          paddingX="5"
          paddingY="3"
          isActive={page === currentPage}
          onClick={() => onChangePage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        h="10"
        colorScheme="gray"
        paddingRight="5"
        isDisabled={!hasNextPage}
        background="background.50"
        onClick={hasNextPage ? () => onChangePage(currentPage + 1) : undefined}
      >
        <Icon name="arrowRight" />
      </Button>
    </ButtonGroup>
  );
};
