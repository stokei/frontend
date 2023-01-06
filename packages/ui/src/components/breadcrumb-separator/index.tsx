import {
  BreadcrumbSeparator as ChakraBreadcrumbSeparator,
  BreadcrumbSeparatorProps as ChakraBreadcrumbSeparatorProps,
} from "@chakra-ui/react";

export interface BreadcrumbSeparatorProps
  extends ChakraBreadcrumbSeparatorProps {}
export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  ...props
}) => (
  <ChakraBreadcrumbSeparator {...props}>{children}</ChakraBreadcrumbSeparator>
);
