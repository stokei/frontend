import { forwardRef, useRadio } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { Box } from "../box";
import { Radio, RadioProps } from "../radio";
import { Stack } from "../stack";

export interface RadioCardProps extends RadioProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const RadioCard: React.FC<RadioCardProps> = forwardRef(
  ({ id, children, ...props }, ref) => {
    return (
      <Box
        width="full"
        height="fit-content"
        cursor="pointer"
        rounded="md"
        paddingX={5}
        paddingY={3}
        role="radio"
        borderWidth="2px"
        borderColor={props?.isChecked ? "primary.500" : undefined}
      >
        <Stack
          width="full"
          height="fit-content"
          direction="row"
          spacing="5"
          align="center"
        >
          <Radio id={id} ref={ref} {...props} />
          {children}
        </Stack>
      </Box>
    );
  }
);
