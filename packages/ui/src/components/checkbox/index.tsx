import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  forwardRef,
} from "@chakra-ui/react";

export interface CheckboxProps extends ChakraCheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = forwardRef(
  ({ ...props }, ref) => (
    <ChakraCheckbox ref={ref} colorScheme="primary" {...props} />
  )
);
