import { ForwardedRef } from "react";
import {
  forwardRef,
  Portal as ChakraPortal,
  PortalProps as ChakraPortalProps,
} from "@chakra-ui/react";

export interface PortalProps extends ChakraPortalProps {
  readonly ref?: ForwardedRef<any>;
}

export const Portal = forwardRef(
  ({ children, containerRef, ...props }: PortalProps, ref) => (
    <ChakraPortal {...props} containerRef={containerRef || (ref as any)}>
      {children}
    </ChakraPortal>
  )
);
