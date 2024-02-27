import { forwardRef, useRadio } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { Box } from "../box";
import { Radio, RadioProps } from "../radio";
import { Stack } from "../stack";

export interface RadioCardProps extends RadioProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const RadioCard = forwardRef(
  ({ id, children, ...props }: RadioCardProps, ref) => {
    return (
      <Box
        as="label"
        width="full"
        cursor="pointer"
        rounded="md"
        borderWidth="2px"
        paddingX={5}
        paddingY={3}
        role="radio"
        borderColor={props?.isChecked ? "primary.500" : undefined}
      >
        <Stack width="full" direction="row" spacing="5">
          <Radio id={id} ref={ref} {...props} />
          {children}
        </Stack>
      </Box>
    );
  }
);
