import { Box, BoxProps } from "../box";

export interface SidebarFooterProps extends BoxProps {}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  ...props
}) => (
  <Box padding="5" flexDirection="column" {...props}>
    {children}
  </Box>
);
