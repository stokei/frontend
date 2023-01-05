import { forwardRef } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSelect } from "../../hooks";
import { Icon, IconName } from "../icon";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputRightElement } from "../input-right-element";
import { Loading } from "../loading";

export interface SelectInputProps extends InputProps {
  readonly rightIcon?: IconName;
}

export const SelectInput: React.FC<SelectInputProps> = forwardRef(
  ({ children, onFocus, size, rightIcon, ...props }, ref) => {
    const { onOpenList, isDisabled, isLoading, isOpenList, isMultiple, value } =
      useSelect();
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
        <InputRightElement
          height="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isLoading ? (
            <Loading size={size} />
          ) : (
            <Icon
              color="gray.500"
              fontSize="xs"
              name={rightIcon || (isOpenList ? "caretUp" : "caretRight")}
            />
          )}
        </InputRightElement>
      </InputGroup>
    );
  }
);
