import { SidebarGroupProvider } from "../../contexts";
import { Stack, StackProps } from "../stack";

export interface SidebarGroupProps extends StackProps {
  readonly startActive?: boolean;
  readonly isActive?: boolean;
}

export const SidebarGroup = ({
  children,
  startActive,
  isActive,
  ...props
}: SidebarGroupProps) => {
  return (
    <SidebarGroupProvider isActive={!!isActive} startActive={!!startActive}>
      <Stack width="full" direction="column" spacing="0" {...props}>
        {children}
      </Stack>
    </SidebarGroupProvider>
  );
};
