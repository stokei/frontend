import { useSidebarGroup } from "../../hooks";
import { Stack, StackProps } from "../stack";

export interface SidebarGroupPanelProps extends StackProps {}

export const SidebarGroupPanel: React.FC<SidebarGroupPanelProps> = ({
  children,
  ...props
}) => {
  const { isOpen } = useSidebarGroup();
  return (
    <Stack
      width="full"
      padding="3"
      align="center"
      direction="column"
      display={isOpen ? "flex" : "none"}
      {...props}
    >
      {children}
    </Stack>
  );
};
