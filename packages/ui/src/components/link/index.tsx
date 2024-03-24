import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { Loading } from "../loading";

export interface LinkProps extends ChakraLinkProps {
  readonly isLoading?: boolean;
  readonly ref?: any;
}

export const Link = forwardRef(
  (
    { children, _hover, href, isLoading, onClick, ...props }: LinkProps,
    ref
  ) => (
    <ChakraLink
      width="fit-content"
      color="primary.500"
      colorScheme="primary"
      rel="noopener"
      _hover={{
        ..._hover,
        textDecoration: "none",
      }}
      href={href || ""}
      onClick={!isLoading ? onClick : undefined}
      {...props}
      ref={ref as any}
    >
      <>
        {children} {isLoading && <Loading size="sm" marginRight="5" />}
      </>
    </ChakraLink>
  )
);

Link.displayName = "Link";
