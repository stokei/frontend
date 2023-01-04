import { useCallback, useMemo } from "react";
import { forwardRef } from "@chakra-ui/react";
import { useSelect } from "../../hooks";
import { Stack, StackProps } from "../stack";
import { Icon } from "../icon";
import { Box } from "../box";

export interface SelectItemProps extends StackProps {
  readonly value: string;
}

export const SelectItem: React.FC<SelectItemProps> = forwardRef(
  ({ children, value, ...props }, ref) => {
    const { onChooseItem, onCloseList, value: currentItem } = useSelect();

    const isActive = useMemo(() => {
      if (Array.isArray(currentItem)) {
        return !!currentItem.includes(value);
      }
      return currentItem === value;
    }, [value, currentItem]);

    const onChooseItemValue = useCallback(() => {
      onChooseItem?.(value);
      onCloseList();
    }, [onChooseItem, value]);

    return (
      <Stack
        direction="row"
        paddingY="3"
        _hover={{
          background: "gray.100",
        }}
        {...props}
        onClick={onChooseItemValue}
      >
        {isActive && (
          <Box>
            <Icon name="star" />
          </Box>
        )}
        <Stack direction="column">{children}</Stack>
      </Stack>
    );
  }
);
