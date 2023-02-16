import {
  forwardRef,
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
  useRadio,
} from "@chakra-ui/react";
import { ForwardedRef } from "react";
import { Box } from "../box";

export interface RadioCardProps extends ChakraRadioProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const RadioCard: React.FC<RadioCardProps> = forwardRef(
  ({ ...props }, ref) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps({}, ref);
    const checkbox = getCheckboxProps({}, ref);

    return (
      <Box width="full" as="label">
        <input {...input} />
        <Box
          {...checkbox}
          width="full"
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          _checked={{
            color: "white",
            borderColor: "primary.600",
          }}
          paddingX={5}
          paddingY={3}
        >
          {props.children}
        </Box>
      </Box>
    );
  }
);
