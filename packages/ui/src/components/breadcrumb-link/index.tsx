import {
  BreadcrumbLink as ChakraBreadcrumbLink,
  BreadcrumbLinkProps as ChakraBreadcrumbLinkProps,
} from "@chakra-ui/react";

export interface BreadcrumbLinkProps extends ChakraBreadcrumbLinkProps {}
export const BreadcrumbLink = ({ children, ...props }: BreadcrumbLinkProps) => (
  <ChakraBreadcrumbLink {...props}>{children}</ChakraBreadcrumbLink>
);
