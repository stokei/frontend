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
}

export const BlockEditableMenu = ({
  onRemove,
  ...props
}: PropsWithChildren<BlockEditableMenuProps>) => {
  return (
    <Stack
      width="full"
      direction="row"
      spacing="1"
      padding="1"
      borderBottomWidth="2px"
      borderColor="primary.500"
    >
      <ButtonGroup spacing="1" variant="ghost">
        <SortableItemTrigger>
          <DraggableTrigger>
            <IconButton name="move" colorScheme="text" />
          </DraggableTrigger>
        </SortableItemTrigger>
        {onRemove && (
          <IconButton name="trash" onClick={onRemove} colorScheme="text" />
        )}
      </ButtonGroup>
    </Stack>
  );
};
