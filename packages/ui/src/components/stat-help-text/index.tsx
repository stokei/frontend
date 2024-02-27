import { StatHelpText as ChakraStatHelpText } from "@chakra-ui/react";

export interface StatHelpTextProps {}

export const StatHelpText = ({ ...props }: StatHelpTextProps) => (
  <ChakraStatHelpText marginBottom="0" {...props} />
);
