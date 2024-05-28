import { Children, PropsWithChildren } from "react";
import { useTranslations } from '../../../../hooks';
import { Box } from '../../../box';
import { Stack, StackProps } from '../../../stack';
import { Text } from '../../../text';

export interface SingleSelectOptionsProps extends StackProps { }

export const SingleSelectOptions = ({ children, ...props }: PropsWithChildren<SingleSelectOptionsProps>) => {
    const translate = useTranslations();
    return (
        <Stack
            width="full"
            direction="column"
            spacing={0}
        >
            {Children.count(children) > 0 ? (
                children
            ) : (
                <Box paddingY="3" paddingX="4">
                    <Text>{translate.formatMessage({ id: "itemsNotFound" })}</Text>
                </Box>
            )}
        </Stack>
    );
}
