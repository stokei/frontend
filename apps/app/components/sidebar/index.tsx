import { useSidebar } from "@/hooks";
import {
  Box,
  SidebarProps as SidebarUIProps,
  Sidebar as SidebarUI,
  Drawer,
  DrawerBody,
} from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SidebarProps extends SidebarUIProps {}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
  children,
  ...props
}) => {
  const { isOpenSidebar, onToggleSidebar } = useSidebar();
  return (
    <Box
      width="280px"
      flexDirection="column"
      display={["none", "none", "flex", "flex"]}
    >
      <Box width="280px" height="full" position="fixed" overflowY="auto">
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
