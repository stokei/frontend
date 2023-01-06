import {
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbItemProps as ChakraBreadcrumbItemProps,
} from "@chakra-ui/react";

export interface BreadcrumbItemProps extends ChakraBreadcrumbItemProps {}
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  ...props
}) => <ChakraBreadcrumbItem {...props}>{children}</ChakraBreadcrumbItem>;
