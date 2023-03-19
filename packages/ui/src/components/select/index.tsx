import { forwardRef } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { SelectProvider } from "../../contexts";
import { useDisclosure } from "../../hooks";
import { Stack, StackProps } from "../stack";
import { Popover } from "../popover";

export interface SelectProps extends Omit<StackProps, "onChange"> {
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly value: any;
  readonly onChooseItem: (value: any) => void;
  readonly onRemoveChooseItem: (value: any) => void;
  readonly ref?: ForwardedRef<any>;
}

export const Select: React.FC<SelectProps> = forwardRef(
  (
    {
      children,
      isDisabled,
      isLoading,
      value,
      onChooseItem,
      onRemoveChooseItem,
      ...props
    },
    ref
  ) => {
    const {
      isOpen: isOpenList,
      onOpen: onOpenList,
      onClose: onCloseList,
      onToggle: onToggleList,
    } = useDisclosure();
    return (
      <SelectProvider
        value={value}
        onChooseItem={onChooseItem}
        onRemoveChooseItem={onRemoveChooseItem}
        isOpenList={isOpenList}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onOpenList={onOpenList}
        onToggleList={onToggleList}
        onCloseList={onCloseList}
      >
        <Popover
          isLazy
          isOpen={isOpenList}
          onClose={onCloseList}
          onOpen={onOpenList}
          autoFocus={false}
          placement="bottom"
          closeOnBlur
        >
          <Stack
            sx={{
              ".chakra-popover__popper": {
                position: "relative !important",
              },
            }}
            w="full"
            ref={ref}
            direction="column"
            spacing="1"
            {...props}
          >
            {children}
          </Stack>
        </Popover>
      </SelectProvider>
    );
  }
);
