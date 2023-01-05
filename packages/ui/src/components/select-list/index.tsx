import { forwardRef } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { PopoverContent } from "../popover-content";
import { Stack, StackProps } from "../stack";

export interface SelectListProps extends StackProps {
  readonly containerRef?: ForwardedRef<any>;
}

export const SelectList: React.FC<SelectListProps> = forwardRef(
  ({ children, containerRef, ...props }, ref) => {
    return (
      <PopoverContent
        width="full"
        maxHeight="250px"
        position="absolute"
        background="white.500"
        opacity="0"
        rounded="sm"
        border="none"
        shadow="base"
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
    );
  }
);
