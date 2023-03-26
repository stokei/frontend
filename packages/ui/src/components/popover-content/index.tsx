import {
  forwardRef,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
} from "@chakra-ui/react";

export interface PopoverContentProps extends ChakraPopoverContentProps {
  readonly ref?: any;
}
export const PopoverContent: React.FC<PopoverContentProps> = forwardRef(
  ({ children, ...props }, ref) => (
    <ChakraPopoverContent ref={ref} {...props}>
      {children}
    </ChakraPopoverContent>
  )
);
