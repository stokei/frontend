import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from "@chakra-ui/react";

export interface TooltipProps extends ChakraTooltipProps {}
export const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => (
  <ChakraTooltip {...props}>{children}</ChakraTooltip>
);
