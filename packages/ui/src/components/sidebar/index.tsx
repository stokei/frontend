import { Box, BoxProps } from "../box";

export interface SidebarProps extends BoxProps {}
export const Sidebar = ({ children, ...props }: SidebarProps) => (
  <Box width="full" {...props} flexDir="column">
    {children}
  </Box>
);
