import { Button, ButtonGroup, IconButton, Stack } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface BlockEditableMenuProps {
  direction: "bottom" | "top";
}

export const BlockEditableMenu = ({
  direction,
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
        <IconButton name="move" />
        <IconButton name="trash" />
      </ButtonGroup>
    </Stack>
  );
};
