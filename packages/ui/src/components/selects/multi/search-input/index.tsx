import { forwardRef } from '@chakra-ui/react';
import { useSelect, useTranslations } from '../../../../hooks';
import { Input, InputProps } from '../../../input';
import { Box } from '../../../box';
import { InputGroup } from '../../../input-group';
import { Icon } from '../../../icon';
import { InputRightElement } from '../../../input-right-element';
import { Loading } from '../../../loading';

export interface MultiSelectSearchInputProps extends Omit<InputProps, 'id'> {
    isLoading?: boolean;
}
export const MultiSelectSearchInput = forwardRef(({ isLoading, ...props }: MultiSelectSearchInputProps, ref) => {
    const translate = useTranslations();
    const { id, isLoading: isLoadingAll, isDisabled } = useSelect();
    const isLoadingComponent = !!isLoadingAll || !!isLoading;
    return (
        <Box width="full" paddingX="2" paddingY="2">
            <InputGroup>
                <Input
                    id={`${id}-single-select-input`}
                    ref={ref}
                    width="full"
                    flexDirection="column"
                    placeholder={translate.formatMessage({ id: 'search' })}
                    {...props}
                    isDisabled={isDisabled || isLoadingComponent}
                    autoComplete="off"
                />
                <InputRightElement
                    height="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {isLoadingComponent ? (
                        <Loading size="sm" />
                    ) : (
                        <Icon
                            color="gray.500"
                            fontSize="xs"
                            name="search"
                        />
                    )}
                </InputRightElement>
            </InputGroup>
        </Box>
    );
})
