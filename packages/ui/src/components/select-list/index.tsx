import { ForwardedRef } from "react";
import { forwardRef } from "@chakra-ui/react";
import { Portal } from "../portal";
import { Stack, StackProps } from "../stack";
import { PopoverContent } from "../popover-content";

export interface SelectListProps extends StackProps {
  readonly containerRef?: ForwardedRef<any>;
}

export const SelectList: React.FC<SelectListProps> = forwardRef(
  ({ children, containerRef, ...props }, ref) => (
    <PopoverContent
      background="white.500"
      maxHeight="250px"
      mt="4"
      py="4"
      opacity="0"
      rounded="md"
      border="none"
      shadow="base"
      pos="absolute"
      zIndex="popover"
      overflowY="auto"
      _focus={{
        boxShadow: "none",
      }}
    >
      <Stack direction="column" spacing={0} {...props}>
        {children}
      </Stack>
    </PopoverContent>
  )
);
