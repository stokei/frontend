import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface LinkProps extends ChakraLinkProps {
  readonly ref?: any;
}

export const Link: React.FC<LinkProps> = forwardRef(
  ({ children, _hover, href, ...props }, ref) => (
    <ChakraLink
      color="primary.500"
      colorScheme="primary"
      rel="noopener"
      _hover={{
        ..._hover,
        textDecoration: "none",
      }}
      href={href || ""}
      {...props}
      ref={ref as any}
    >
      <>{children}</>
    </ChakraLink>
  )
);
