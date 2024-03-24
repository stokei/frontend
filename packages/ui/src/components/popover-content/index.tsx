import {
  forwardRef,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface PopoverContentProps extends ChakraPopoverContentProps {
  readonly ref?: any;
}
export const PopoverContent = forwardRef(
  ({ children, ...props }: PropsWithChildren<PopoverContentProps>, ref) => (
    <ChakraPopoverContent ref={ref} {...props}>
      {children}
    </ChakraPopoverContent>
  )
);
