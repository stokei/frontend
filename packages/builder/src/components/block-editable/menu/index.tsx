import {
  ButtonGroup,
  IconButton,
  SortableItemTrigger,
  Stack,
} from "@stokei/ui";
import { PropsWithChildren } from "react";

interface BlockEditableMenuProps {
  readonly onRemove?: () => void;
  readonly hasSortable?: boolean;
}

export const BlockEditableMenu = ({
  onRemove,
  hasSortable = false,
  ...props
}: PropsWithChildren<BlockEditableMenuProps>) => {
  const hasRemoveButton = !!onRemove;

  return (
    <Stack
      width="full"
      direction="row"
      spacing="1"
      padding="1"
      borderBottomWidth="2px"
      borderColor="primary.500"
      justifyContent="space-between"
    >
      <ButtonGroup spacing="1" variant="ghost">
        {hasSortable && (
          <SortableItemTrigger>
            <IconButton name="move" colorScheme="text" />
          </SortableItemTrigger>
        )}
      </ButtonGroup>
      <ButtonGroup spacing="1" variant="ghost">
        {hasRemoveButton && (
          <IconButton name="trash" onClick={onRemove} colorScheme="text" />
        )}
      </ButtonGroup>
    </Stack>
  );
};
