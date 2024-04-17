import {
  ButtonGroup,
  DraggableTrigger,
  IconButton,
  Stack
} from "@stokei/ui";
import { PropsWithChildren } from "react";

interface BlockEditableMenuProps {
  readonly onRemove?: () => void;
  readonly onUpdate?: () => void;
  readonly hasDnD?: boolean;
}

export const BlockEditableMenu = ({
  onRemove,
  onUpdate,
  hasDnD,
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
        {hasDnD && (
          <DraggableTrigger>
            <IconButton name="move" colorScheme="text" />
          </DraggableTrigger>
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
