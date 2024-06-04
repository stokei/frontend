import { useStyleConfig } from '@chakra-ui/react';
import {
    ComboboxButton
} from '@headlessui/react';
import { PropsWithChildren, ReactNode } from "react";
import { useSelect } from '../../../../hooks';
import { Box } from '../../../box';
import { Button, ButtonProps } from '../../../button';
import { Icon } from '../../../icon';
import { Loading } from '../../../loading';
import { Text } from '../../../text';

export interface SingleSelectButtonProps extends ButtonProps {
    readonly placeholder: string;
    readonly item: (value: any) => ReactNode;
}

export const SingleSelectButton = ({ children, placeholder, item, ...props }: PropsWithChildren<SingleSelectButtonProps>) => {
    const {
        value,
        isDisabled,
        isLoading,
        hasValue,
    } = useSelect();

    const isBlocked = isLoading || isDisabled || props?.isDisabled;

    const themeInput: any = useStyleConfig("Input", props);
    return (
        <Button
            as={ComboboxButton}
            width="full"
            __css={themeInput?.field}
            height="fit-content"
            h="fit-content"
            pos="relative"
            minH="10"
            py="0"
            px="0"
            alignItems="center"
            justifyContent="space-between"
            cursor={isBlocked ? "not-allowed" : undefined}
            isDisabled={isBlocked}
            variant="unstyled"
            borderRadius="md"
            overflow="hidden"
            background="background.50"
        >
            <Box
                width="full"
                flexDirection="row"
                align="center"
                justify="space-between"
            >
                {hasValue && !!item ? (
                    <Box
                        maxWidth="full"
                        flex="1"
                        height="full"
                        paddingX="3"
                        flexWrap="wrap"
                        cursor={isBlocked ? "not-allowed" : undefined}
                    >
                        {item?.(value)}
                    </Box>
                ) : (
                    <>
                        {placeholder && (
                            <Text
                                flex="1"
                                paddingX="3"
                                cursor={isBlocked ? "not-allowed" : undefined}
                                color="text.200"
                            >
                                {placeholder}
                            </Text>
                        )}
                    </>
                )}
                <Box paddingX="3" height="full">
                    {isLoading ? (
                        <Loading size="sm" />
                    ) : (
                        <Icon
                            color="gray.500"
                            fontSize="xs"
                            name="caretDown"
                        />
                    )}
                </Box>
            </Box>
        </Button>
    );
}
