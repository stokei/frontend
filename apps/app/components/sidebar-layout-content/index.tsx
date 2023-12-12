import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SidebarLayoutContentProps extends BoxProps {}

export const SidebarLayoutContent: FC<
  PropsWithChildren<SidebarLayoutContentProps>
> = ({ children, ...props }) => {
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
