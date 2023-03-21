import { forwardRef } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { Box } from "../box";
import { Checkbox, CheckboxProps } from "../checkbox";
import { Stack } from "../stack";

export interface CheckboxCardProps extends CheckboxProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const CheckboxCard: React.FC<CheckboxCardProps> = forwardRef(
  ({ id, children, ...props }, ref) => {
    return (
      <Box
        as="label"
        width="full"
        cursor="pointer"
        rounded="md"
        borderWidth="2px"
        paddingX={5}
        paddingY={3}
        borderColor={props?.isChecked ? "primary.500" : undefined}
      >
        <Stack width="full" direction="row" spacing="5">
          <Checkbox id={id} ref={ref} {...props} />
          {children}
        </Stack>
      </Box>
    );
  }
);
