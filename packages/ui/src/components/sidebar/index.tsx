import { Box, BoxProps } from "../box";

export interface SidebarProps extends BoxProps {}
export const Sidebar: React.FC<SidebarProps> = ({ children, ...props }) => (
  <Box width="full" {...props} flexDir="column">
    {children}
  </Box>
);
