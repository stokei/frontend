import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from "@chakra-ui/react";

export interface RadioGroupProps extends ChakraRadioGroupProps {}

export const RadioGroup: React.FC<RadioGroupProps> = ({ ...props }) => (
  <ChakraRadioGroup {...props} />
);
