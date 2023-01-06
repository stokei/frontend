import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react";

export interface BreadcrumbProps extends ChakraBreadcrumbProps {}
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  ...props
}) => <ChakraBreadcrumb {...props}>{children}</ChakraBreadcrumb>;
