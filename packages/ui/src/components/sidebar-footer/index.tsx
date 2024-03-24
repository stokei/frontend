import { Box, BoxProps } from "../box";

export interface SidebarFooterProps extends BoxProps {}

export const SidebarFooter = ({ children, ...props }: SidebarFooterProps) => (
  <Box padding="5" flexDirection="column" {...props}>
    {children}
  </Box>
);
