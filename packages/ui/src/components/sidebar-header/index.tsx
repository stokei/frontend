import { Box, BoxProps } from "../box";

export interface SidebarHeaderProps extends BoxProps {}

export const SidebarHeader = ({ children, ...props }: SidebarHeaderProps) => (
  <Box padding="5" flexDirection="column" {...props}>
    {children}
  </Box>
);
