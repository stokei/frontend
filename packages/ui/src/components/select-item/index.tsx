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
    const {
      value: currentItem,
      isMultiple,
      onChooseItem,
      onCloseList,
      onRemoveChooseItem,
    } = useSelect();

    const isActive = useMemo(() => {
      if (Array.isArray(currentItem)) {
        return !!currentItem.includes(value);
      }
      return currentItem === value;
    }, [value, currentItem]);

    const onChooseItemValue = useCallback(() => {
      if (!isActive) {
        onChooseItem?.(value);
      } else {
        onRemoveChooseItem?.(value);
      }
      if (isMultiple) {
        return;
      }
      onCloseList();
    }, [
      value,
      isActive,
      isMultiple,
      onCloseList,
      onChooseItem,
      onRemoveChooseItem,
    ]);

    return (
      <Stack
        direction="row"
        padding="3"
        alignItems="center"
        _hover={{
          background: "gray.50",
        }}
        background={isActive ? "gray.50" : props.background}
        {...props}
        onClick={onChooseItemValue}
      >
        <Stack flex="1" direction="column">
          {children}
        </Stack>
        {isActive && (
          <Box>
            <Icon name="check" color="success.500" fontSize="lg" />
          </Box>
        )}
      </Stack>
    );
  }
);
