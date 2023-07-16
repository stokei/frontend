import { useCallback, useMemo } from "react";
import { forwardRef } from "@chakra-ui/react";
import { useSelect } from "../../hooks";
import { Stack, StackProps } from "../stack";
import { Icon } from "../icon";
import { Box } from "../box";

const getValue = (value: any) => value || value?.id || value?.value;
const isActiveGenericValue = (firstValue: any, secondValue: any) => {
  const first = getValue(firstValue);
  const second = getValue(secondValue);
  if (!first || !second) {
    return false;
  }
  return first === second;
};

export interface SelectItemProps extends StackProps {
  readonly value: any;
}

export const SelectItem: React.FC<SelectItemProps> = forwardRef(
  ({ children, value, ...props }, ref) => {
    const {
      value: currentItem,
      isMultiple,
      isLoading,
      isDisabled,
      onChooseItem,
      onCloseList,
      onRemoveChooseItem,
    } = useSelect();

    const isBlocked = isLoading || isDisabled;

    const isActive = useMemo(() => {
      if (Array.isArray(currentItem)) {
        return !!currentItem.find((currentItemValue) =>
          isActiveGenericValue(currentItemValue, value)
        );
      }
      return isActiveGenericValue(currentItem, value);
    }, [value, currentItem]);

    const onChooseItemValue = useCallback(() => {
      if (isBlocked) {
        return;
      }
      onCloseList();
      if (!isActive) {
        onChooseItem?.(value);
      } else {
        onRemoveChooseItem?.(value);
      }
    }, [
      value,
      isBlocked,
      isActive,
      onCloseList,
      onChooseItem,
      onRemoveChooseItem,
    ]);

    return (
      <Stack
        direction="row"
        padding="3"
        alignItems="center"
        role="listitem"
        _hover={{
          background: "gray.50",
        }}
        background={isActive ? "gray.50" : props.background}
        cursor="pointer"
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
