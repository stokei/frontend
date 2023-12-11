import { IconButtonProps, IconButton } from "@stokei/ui";
import { forwardRef } from "react";

export const ActionsButton = forwardRef((props: IconButtonProps, ref) => (
  <IconButton {...props} name="edit" variant="ghost" ref={ref} />
));
ActionsButton.displayName = "ActionsButton";
