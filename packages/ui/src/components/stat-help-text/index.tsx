import { StatHelpText as ChakraStatHelpText } from "@chakra-ui/react";

export interface StatHelpTextProps {}

export const StatHelpText: React.FC<StatHelpTextProps> = ({ ...props }) => (
  <ChakraStatHelpText marginBottom="0" {...props} />
);
