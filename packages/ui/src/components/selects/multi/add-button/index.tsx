import { PropsWithChildren } from "react";
import { Button, ButtonProps } from '../../../button';
import { Box } from "../../../box";

export interface MultiSelectAddButtonProps extends ButtonProps { }

export const MultiSelectAddButton = ({ children, ...props }: PropsWithChildren<MultiSelectAddButtonProps>) => {
    return (
        <Box width="full" paddingX="2" paddingY="0">
            <Button
                width="full"
                variant="ghost"
                rounded="md"
                {...props}
            >
                {children}
            </Button>
        </Box>
    );
}
