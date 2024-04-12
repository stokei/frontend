import {
  ButtonGroup,
  DraggableTrigger,
  IconButton,
  SortableItemTrigger,
  Stack,
} from "@stokei/ui";
import { PropsWithChildren } from "react";

interface BlockEditableMenuProps {
  readonly onRemove?: () => void;
  readonly onUpdate?: () => void;
  readonly hasSortable?: boolean;
}

export const BlockEditableMenu = ({
  onRemove,
  onUpdate,
  hasSortable = false,
  ...props
}: PropsWithChildren<BlockEditableMenuProps>) => {
  const hasRemoveButton = !!onRemove;
  const hasUpdateButton = !!onUpdate;

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
            <DraggableTrigger>
              <IconButton name="move" colorScheme="text" />
            </DraggableTrigger>
          </SortableItemTrigger>
        )}
      </ButtonGroup>
      <ButtonGroup spacing="1" variant="ghost">
        {hasRemoveButton && (
          <IconButton name="trash" onClick={onRemove} colorScheme="text" />
        )}
        {hasUpdateButton && (
          <IconButton name="edit" onClick={onUpdate} colorScheme="text" />
        )}
      </ButtonGroup>
    </Stack>
  );
};
