import { forwardRef, theme, useMultiStyleConfig } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSelect } from "../../hooks";
import { Box } from "../box";
import { Icon, IconName } from "../icon";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputRightElement } from "../input-right-element";
import { Loading } from "../loading";
import { Stack } from "../stack";

export interface SelectInputProps extends InputProps {
  readonly rightIcon?: IconName;
}

export const SelectInput: React.FC<SelectInputProps> = forwardRef(
  ({ children, onFocus, size, rightIcon, ...props }, ref) => {
    const {
      onOpenList,
      isDisabled,
      isLoading,
      isOpenList,
      isMultiple,
      hasValue,
    } = useSelect();

    const isBlocked = isLoading || isDisabled || props?.isDisabled;
    const isAllowedToAddMultiStyles = isMultiple && hasValue && !!children;

    const onFocusInput = useCallback(
      (e: any) => {
        onOpenList();
        onFocus?.(e);
      },
      [onFocus, onOpenList]
    );

    const themeInput: any = useMultiStyleConfig("Input", props);
    const inputStylesProps = {
      ...(isAllowedToAddMultiStyles && {
        ...themeInput.field,
        _focusWithin: themeInput.field._focus,
        pos: "relative",
        minH: "10",
        py: 0,
        px: 0,
        spacing: 0,
      }),
    };

    return (
      <Stack
        direction="column"
        {...(isAllowedToAddMultiStyles && inputStylesProps)}
        height="auto"
        cursor={isBlocked ? "not-allowed" : undefined}
      >
        {hasValue && children && (
          <Box
            padding={isMultiple ? "3" : undefined}
            paddingBottom={0}
            cursor={isBlocked ? "not-allowed" : undefined}
          >
            {children}
          </Box>
        )}
        <InputGroup padding={isAllowedToAddMultiStyles ? "3" : undefined}>
          <Input
            isDisabled={isBlocked}
            autoComplete="off"
            size={size}
            {...props}
            variant={isAllowedToAddMultiStyles ? "unstyled" : props.variant}
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
      </Stack>
    );
  }
);
