import { PopoverTrigger as ChakraPopoverTrigger } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface PopoverTriggerProps {}
export const PopoverTrigger = ({
  children,
  ...props
}: PropsWithChildren<PopoverTriggerProps>) => (
  <ChakraPopoverTrigger {...props}>{children}</ChakraPopoverTrigger>
);
