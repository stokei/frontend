import { useCallback } from "react";
import { forwardRef } from "@chakra-ui/react";
import { useSelect } from "../../hooks";
import { Input, InputProps } from "../input";

export interface SelectInputProps extends InputProps {}

export const SelectInput: React.FC<SelectInputProps> = forwardRef(
  ({ children, onFocus, ...props }, ref) => {
    const { onOpenList } = useSelect();
    const onFocusInput = useCallback((e) => {
      onOpenList();
      onFocus?.(e);
    }, []);
    return (
      <Input
        focusBorderColor="primary.500"
        colorScheme="primary"
        errorBorderColor="error.500"
        autoComplete="off"
        size="lg"
        {...props}
        ref={ref}
        onFocus={onFocusInput}
      />
    );
  }
);
