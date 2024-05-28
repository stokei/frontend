import {
    ComboboxOptions
} from '@headlessui/react';
import { PropsWithChildren } from "react";
import { useTranslations } from '../../../../hooks';
import { Stack, StackProps } from '../../../stack';

export interface MultiSelectComboboxProps extends StackProps { }

export const MultiSelectCombobox = ({ children, ...props }: PropsWithChildren<MultiSelectComboboxProps>) => {
    return (
        <Stack
            as={ComboboxOptions}
            background="background.50"
            width="full"
            direction="column"
            spacing={0}
            rounded="sm"
            border="none"
            shadow="base"
        >
            {children}
        </Stack>
    );
}
