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
      h="10"
      colorScheme="gray"
      paddingRight="5"
      isDisabled={!hasPreviousPage}
      background="background.50"
      onClick={
        hasPreviousPage ? () => onChangePage(currentPage - 1) : undefined
      }
    >
      <Icon name="arrowLeft" />
    </Button>
    <Button
      h="10"
      colorScheme="gray"
      paddingX="5"
      paddingY="3"
      background="background.50"
      cursor="default"
      _hover={{
        background: "background.50",
      }}
    >
      {currentPage}
    </Button>
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
