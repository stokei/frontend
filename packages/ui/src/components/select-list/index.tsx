import { forwardRef } from "@chakra-ui/react";
import { ForwardedRef, Children, useRef } from "react";
import { useSelect, useTranslations } from "../../hooks";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { PopoverContent } from "../popover-content";
import { Stack, StackProps } from "../stack";
import { Text } from "../text";
import { Box } from "../box";

export interface SelectListProps extends StackProps {
  readonly containerRef?: ForwardedRef<any>;
}

export const SelectList: React.FC<SelectListProps> = forwardRef(
  ({ children, containerRef, ...props }, ref) => {
    const { onCloseList } = useSelect();
    const myRef = useRef<any>();
    const translate = useTranslations();

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
          {Children.count(children) > 0 ? (
            children
          ) : (
            <Box paddingY="3" paddingX="4">
              <Text>{translate.formatMessage({ id: "itemsNotFound" })}</Text>
            </Box>
          )}
        </Stack>
      </PopoverContent>
    );
  }
);
