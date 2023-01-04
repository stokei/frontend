import { Stack, StackProps } from "../stack";

export interface SidebarBodyProps extends StackProps {}

export const SidebarBody: React.FC<SidebarBodyProps> = ({
  children,
  ...props
}) => (
  <Stack padding="5" spacing="2" {...props} direction="column" flex="1">
    {children}
  </Stack>
);
