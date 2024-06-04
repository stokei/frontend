import {
    ComboboxOptions
} from '@headlessui/react';
import { PropsWithChildren } from "react";
import { Stack, StackProps } from '../../../stack';

export interface MultiSelectComboboxProps extends StackProps { }

export const MultiSelectCombobox = ({ children, ...props }: PropsWithChildren<MultiSelectComboboxProps>) => {
    return (
        <Stack
            as={ComboboxOptions}
            position="absolute"
            zIndex="popover"
            background="background.50"
            width="full"
            direction="column"
            spacing={0}
            rounded="sm"
            border="none"
            shadow="base"
            overflowX="hidden"
            overflowY="auto"
        >
            {children}
        </Stack>
    );
}
