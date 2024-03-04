import { Button, Stack } from "@stokei/ui";
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
      top={direction === "top" ? "-10" : undefined}
      bottom={direction === "bottom" ? "-10" : undefined}
      position="absolute"
      direction="row"
    >
      <Button>Menu</Button>
    </Stack>
  );
};
