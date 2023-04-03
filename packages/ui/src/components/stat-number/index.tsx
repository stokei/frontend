import {
  StatNumber as ChakraStatNumber,
  StatNumberProps as ChakraStatNumberProps,
} from "@chakra-ui/react";

export interface StatNumberProps extends ChakraStatNumberProps {}
export const StatNumber: React.FC<StatNumberProps> = ({
  children,
  ...props
}) => (
  <ChakraStatNumber fontSize="3xl" {...props}>
    {children}
  </ChakraStatNumber>
);
