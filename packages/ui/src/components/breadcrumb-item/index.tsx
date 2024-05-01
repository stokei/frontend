import {
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbItemProps as ChakraBreadcrumbItemProps,
} from "@chakra-ui/react";

export interface BreadcrumbItemProps extends ChakraBreadcrumbItemProps {}
export const BreadcrumbItem = ({ children, ...props }: BreadcrumbItemProps) => (
  <ChakraBreadcrumbItem {...props}>{children}</ChakraBreadcrumbItem>
);
