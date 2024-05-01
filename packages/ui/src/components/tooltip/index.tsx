import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from "@chakra-ui/react";

export interface TooltipProps extends ChakraTooltipProps {}
export const Tooltip = ({ children, ...props }: TooltipProps) => (
  <ChakraTooltip {...props}>{children}</ChakraTooltip>
);
