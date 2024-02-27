import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { IconName, Icon } from "../icon";

export interface IconButtonProps
  extends Omit<ChakraIconButtonProps, "aria-label"> {
  readonly name: IconName;
  readonly ref?: any;
}
export const IconButton = forwardRef(
  ({ name, ...props }: IconButtonProps, ref) => (
    <ChakraIconButton
      colorScheme="primary"
      {...props}
      aria-label={name}
      ref={ref}
      icon={<Icon name={name} />}
    />
  )
);
IconButton.displayName = "IconButton";
