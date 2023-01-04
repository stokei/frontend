import {
  StatNumber as ChakraStatNumber,
  StatNumberProps as ChakraStatNumberProps,
} from "@chakra-ui/react";

export interface StatNumberProps extends ChakraStatNumberProps {}
export const StatNumber: React.FC<StatNumberProps> = ({
  children,
  ...props
}) => <ChakraStatNumber {...props}>{children}</ChakraStatNumber>;
