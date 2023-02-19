import { Stack, StackProps } from "../stack";

export interface SidebarBodyProps extends StackProps {}

export const SidebarBody: React.FC<SidebarBodyProps> = ({
  children,
  ...props
}) => (
  <Stack padding="5" spacing="0" direction="column" flex="1" {...props}>
    {children}
  </Stack>
);
