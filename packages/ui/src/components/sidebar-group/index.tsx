import { SidebarGroupProvider } from "../../contexts";
import { Stack, StackProps } from "../stack";

export interface SidebarGroupProps extends StackProps {
  readonly isActive?: boolean;
}

export const SidebarGroup = ({
  children,
  isActive,
  ...props
}: SidebarGroupProps) => {
  return (
    <SidebarGroupProvider isActive={!!isActive}>
      <Stack width="full" direction="column" spacing="0" {...props}>
        {children}
      </Stack>
    </SidebarGroupProvider>
  );
};
