import {
  BreadcrumbSeparator as ChakraBreadcrumbSeparator,
  BreadcrumbSeparatorProps as ChakraBreadcrumbSeparatorProps,
} from "@chakra-ui/react";

export interface BreadcrumbSeparatorProps
  extends ChakraBreadcrumbSeparatorProps {}
export const BreadcrumbSeparator = ({
  children,
  ...props
}: BreadcrumbSeparatorProps) => (
  <ChakraBreadcrumbSeparator {...props}>{children}</ChakraBreadcrumbSeparator>
);
