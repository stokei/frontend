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
        w="full"
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
