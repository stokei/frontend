import { useCallback } from "react";
import { forwardRef } from "@chakra-ui/react";
import { useSelect } from "../../hooks";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputRightElement } from "../input-right-element";
import { Icon } from "../icon";
import { Loading } from "../loading";
import { Box } from "../box";

export interface SelectInputProps extends InputProps {}

export const SelectInput: React.FC<SelectInputProps> = forwardRef(
  ({ children, onFocus, size, ...props }, ref) => {
    const { onOpenList, isDisabled, isLoading, isOpenList } = useSelect();
    const onFocusInput = useCallback(
      (e) => {
        onOpenList();
        onFocus?.(e);
      },
      [onFocus, onOpenList]
    );

    return (
      <InputGroup>
        <Input
          isDisabled={isLoading || isDisabled}
          focusBorderColor="primary.500"
          colorScheme="primary"
          errorBorderColor="error.500"
          autoComplete="off"
          size={size}
          {...props}
          ref={ref}
          onFocus={onFocusInput}
        />
        <InputRightElement>
          <Box
            height="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {isLoading ? (
              <Loading size={size} />
            ) : (
              <Icon name={isOpenList ? "caretUp" : "caretDown"} />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>
    );
  }
);
