import {
  BreadcrumbLink as ChakraBreadcrumbLink,
  BreadcrumbLinkProps as ChakraBreadcrumbLinkProps,
} from "@chakra-ui/react";

export interface BreadcrumbLinkProps extends ChakraBreadcrumbLinkProps {}
export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  ...props
}) => <ChakraBreadcrumbLink {...props}>{children}</ChakraBreadcrumbLink>;
