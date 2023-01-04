import { Box, BoxProps } from "../box";

export interface SidebarHeaderProps extends BoxProps {}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  ...props
}) => (
  <Box padding="5" {...props}>
    {children}
  </Box>
);
