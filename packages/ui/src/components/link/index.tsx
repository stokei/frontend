import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export interface LinkProps extends ChakraLinkProps {}

export const Link: React.FC<LinkProps> = ({ children, _hover, ...props }) => (
  <ChakraLink
    colorScheme="primary"
    rel="noopener"
    _hover={{
      ..._hover,
      textDecoration: "none",
    }}
    {...props}
  >
    {children}
  </ChakraLink>
);
