import { forwardRef } from "@chakra-ui/react";
import { ForwardedRef, useEffect, useRef } from "react";
import { useSelect } from "../../hooks";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { PopoverContent } from "../popover-content";
import { Stack, StackProps } from "../stack";

export interface SelectListProps extends StackProps {
  readonly containerRef?: ForwardedRef<any>;
}

export const SelectList: React.FC<SelectListProps> = forwardRef(
  ({ children, containerRef, ...props }, ref) => {
    const { onCloseList } = useSelect();
    const myRef = useRef<any>();

    useOnClickOutside(myRef, () => onCloseList());

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
        ref={myRef as any}
      >
        <Stack direction="column" spacing={0} {...props}>
          {children}
        </Stack>
      </PopoverContent>
    );
  }
);
