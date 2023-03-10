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

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
  ...props
}) => (
  <ButtonGroup isAttached spacing="0" variant="outline" rounded="md" {...props}>
    <Button
      height="10"
      colorScheme="gray"
      paddingRight="5"
      isDisabled={!hasPreviousPage}
      onClick={
        hasPreviousPage ? () => onChangePage(currentPage - 1) : undefined
      }
    >
      <Icon name="arrowLeft" />
    </Button>
    <Button height="10" colorScheme="gray" paddingX="5" paddingY="3">
      {currentPage}
    </Button>
    <Button
      colorScheme="gray"
      paddingRight="5"
      height="10"
      isDisabled={!hasNextPage}
      onClick={hasNextPage ? () => onChangePage(currentPage + 1) : undefined}
    >
      <Icon name="arrowRight" />
    </Button>
  </ButtonGroup>
);
