import { PopoverTrigger as ChakraPopoverTrigger } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface PopoverTriggerProps {}
export const PopoverTrigger: React.FC<
  PropsWithChildren<PopoverTriggerProps>
> = ({ children, ...props }) => (
  <ChakraPopoverTrigger {...props}>{children}</ChakraPopoverTrigger>
);
