import { forwardRef, useRadio } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { Box } from "../box";
import { Radio, RadioProps } from "../radio";

export interface RadioCardProps extends RadioProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const RadioCard: React.FC<RadioCardProps> = forwardRef(
  ({ id, children, ...props }, ref) => {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();
    return (
      <Box as="label" width="full" flexDirection="column" cursor="pointer">
        <Radio {...input} id={id} position="relative" width="fit-content" />
        <Box
          {...checkbox}
          width="full"
          cursor="pointer"
          borderWidth="2px"
          rounded="md"
          _checked={{
            borderColor: "primary.500",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        >
          {children}
        </Box>
      </Box>
    );
  }
);
