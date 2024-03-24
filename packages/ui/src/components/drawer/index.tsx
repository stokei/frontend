import {
  Drawer as ChakraDrawer,
  DrawerCloseButton as ChakraDrawerCloseButton,
  DrawerContent as ChakraDrawerContent,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerProps as ChakraDrawerProps,
} from "@chakra-ui/react";

export interface DrawerProps extends ChakraDrawerProps {}
export const Drawer = ({ children, ...props }: DrawerProps) => (
  <ChakraDrawer size={["xs", "xs", "md", "md"]} {...props}>
    <ChakraDrawerOverlay />
    <ChakraDrawerContent background="background.50">
      <ChakraDrawerCloseButton />
      {children}
    </ChakraDrawerContent>
  </ChakraDrawer>
);
