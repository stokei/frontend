import { forwardRef, useMultiStyleConfig } from "@chakra-ui/react";
import { ReactNode, useCallback } from "react";
import { useSelect } from "../../hooks";
import { Box } from "../box";
import { Button } from "../button";
import { Icon, IconName } from "../icon";
import { InputProps } from "../input";
import { Loading } from "../loading";
import { SelectTagItem } from "../select-tag-item";
import { SelectTagList } from "../select-tag-list";

export interface SelectInputProps extends InputProps {
  readonly rightIcon?: IconName;
  readonly item: (value: any) => ReactNode;
}

export const SelectInput: React.FC<SelectInputProps> = forwardRef(
  ({ children, onClick, size, rightIcon, item, ...props }, ref) => {
    const {
      value,
      onToggleList,
      isDisabled,
      isLoading,
      isOpenList,
      isMultiple,
      hasValue,
    } = useSelect();

    const isBlocked = isLoading || isDisabled || props?.isDisabled;

    const onClickInput = useCallback(
      (e: any) => {
        onClick?.(e);
        onToggleList();
      },
      [onClick, onToggleList]
    );

    const themeInput: any = useMultiStyleConfig("Input", props);

    return (
      <Button
        {...themeInput.field}
        _focusWithin={themeInput.field._focus}
        height="fit-content"
        h="fit-content"
        pos="relative"
        minH="10"
        py="0"
        px="0"
        spacing="0"
        alignItems="center"
        justifyContent="space-between"
        cursor={isBlocked ? "not-allowed" : undefined}
        isDisabled={isBlocked}
        onClick={onClickInput}
        variant="unstyled"
        {...props}
      >
        <Box
          width="full"
          flexDirection="row"
          align="center"
          justify="space-between"
        >
          {hasValue && !!item && (
            <Box
              maxWidth="full"
              flex="1"
              height="full"
              paddingX="3"
              cursor={isBlocked ? "not-allowed" : undefined}
            >
              <SelectTagList>
                {isMultiple ? (
                  value?.map((currentValue: any) => (
                    <SelectTagItem key={currentValue?.id}>
                      {item?.(currentValue)}
                    </SelectTagItem>
                  ))
                ) : (
                  <SelectTagItem>{item?.(value)}</SelectTagItem>
                )}
              </SelectTagList>
            </Box>
          )}
          <Box paddingX="3" height="full">
            {isLoading ? (
              <Loading size={size} />
            ) : (
              <Icon
                color="gray.500"
                fontSize="xs"
                name={rightIcon || (isOpenList ? "caretUp" : "caretDown")}
              />
            )}
          </Box>
        </Box>
      </Button>
    );
  }
);
