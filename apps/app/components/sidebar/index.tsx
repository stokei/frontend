import { useSidebar } from "@/hooks";
import {
  Box,
  SidebarProps as SidebarUIProps,
  Sidebar as SidebarUI,
  Drawer,
  DrawerBody,
} from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SidebarProps extends SidebarUIProps {}

export const Sidebar = ({
  children,
  ...props
}: PropsWithChildren<SidebarProps>) => {
  const { isOpenSidebar, onToggleSidebar } = useSidebar();
  return (
    <Box
      width="280px"
      minWidth="280px"
      flexDirection="column"
      minHeight="100vh"
      zIndex="1"
      display={["none", "none", "flex", "flex"]}
    >
      <Box
        width="280px"
        minWidth="280px"
        height="full"
        position="fixed"
        overflowY="auto"
      >
        <SidebarUI
          width="full"
          height="full"
          background="background.50"
          borderRightWidth="thin"
          {...props}
        >
          {children}
        </SidebarUI>

        <Drawer
          placement="left"
          isOpen={isOpenSidebar}
          onClose={onToggleSidebar}
        >
          {children}
        </Drawer>
      </Box>
    </Box>
  );
};
