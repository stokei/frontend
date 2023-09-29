import { Button, Stack } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface BlockEditableMenuProps {
  direction: "bottom" | "top";
}

export const BlockEditableMenu: FC<
  PropsWithChildren<BlockEditableMenuProps>
> = ({ direction, ...props }) => {
  return (
    <Stack
      top={direction === "top" ? "-20" : undefined}
      bottom={direction === "bottom" ? "-20" : undefined}
      position="absolute"
      direction="row"
    >
      <Button>Rreloug</Button>
    </Stack>
  );
};
