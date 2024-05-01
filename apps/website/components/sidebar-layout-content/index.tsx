import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SidebarLayoutContentProps extends BoxProps {}

export const SidebarLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<SidebarLayoutContentProps>) => {
  return (
    <Box
      minHeight="100vh"
      overflowX="hidden"
      flex="1"
      flexDirection="column"
      {...props}
    >
      {children}
    </Box>
  );
};
