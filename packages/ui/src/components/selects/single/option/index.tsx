import {
    ComboboxOption
} from '@headlessui/react';
import { PropsWithChildren, useMemo } from "react";
import { Box, BoxProps } from '../../../box';
import { useSelect } from '../../../../hooks';
import { Stack } from '../../../stack';
import { Icon } from '../../../icon';

const getValue = (value: any) =>
    value?.id || value?.code || value?.value || value;
const isActiveGenericValue = (firstValue: any, secondValue: any) => {
    const first = getValue(firstValue);
    const second = getValue(secondValue);
    if (typeof first === "boolean" && typeof second === "boolean") {
        return first === second;
    }
    if (!first || !second) {
        return false;
    }
    return first === second;
};

export interface SingleSelectOptionProps<TValue = any> extends BoxProps {
    value: TValue
}
export const SingleSelectOption = ({ value, children, ...props }: PropsWithChildren<SingleSelectOptionProps>) => {
    const {
        value: currentItem,
        isLoading,
        isDisabled,
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

    return (
        <Stack
            width="full"
            direction="row"
            as={ComboboxOption}
            value={value}
            padding="3"
            alignItems="center"
            _hover={{
                background: "gray.50",
            }}
            background={isActive ? "gray.50" : props.background}
            cursor={isBlocked ? "not-allowed" : "pointer"}
        >
            <Icon
                name={isActive ? "check" : "uncheck"}
                color={isActive ? "green.500" : "text.300"}
                fontSize="lg"
            />
            <Stack flex="1" direction="column">
                {children}
            </Stack>
        </Stack>
    );
}
