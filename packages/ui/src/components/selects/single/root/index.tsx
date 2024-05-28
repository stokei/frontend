import { forwardRef } from "@chakra-ui/react";
import { Combobox } from '@headlessui/react';
import { ForwardedRef } from "react";
import { SelectProvider } from '../../../../contexts';
import { StackProps } from '../../../stack';

export interface SingleSelectProps<TValue = any> extends Omit<StackProps, "onChange" | "id"> {
    readonly id: string;
    readonly value: TValue;
    readonly onChange: (value: TValue) => void;
    readonly onClose?: () => void;
    readonly isLoading?: boolean;
    readonly isDisabled?: boolean;
    readonly ref?: ForwardedRef<any>;
}
export const SingleSelect = forwardRef(
    ({
        id,
        value,
        isLoading,
        isDisabled,
        onChange,
        onClose,
        children
    }: SingleSelectProps, ref) => {
        return (
            <SelectProvider
                id={id}
                value={value}
                onChange={onChange}
                isLoading={isLoading}
                isDisabled={isDisabled}
            >
                <Combobox
                    ref={ref}
                    value={value}
                    onChange={currentValue => onChange?.(currentValue)}
                    onClose={onClose}
                >
                    {children}
                </Combobox>
            </SelectProvider>
        );
    })
