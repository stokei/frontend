import { PropsWithChildren } from "react";
import { Button, ButtonProps } from '../../../button';
import { Box } from "../../../box";

export interface SingleSelectAddButtonProps extends ButtonProps { }

export const SingleSelectAddButton = ({ children, ...props }: PropsWithChildren<SingleSelectAddButtonProps>) => {
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
