import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react";

export interface BreadcrumbProps extends ChakraBreadcrumbProps {}
export const Breadcrumb = ({ children, ...props }: BreadcrumbProps) => (
  <ChakraBreadcrumb {...props}>{children}</ChakraBreadcrumb>
);
