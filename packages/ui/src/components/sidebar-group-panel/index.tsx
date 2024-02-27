import { useSidebarGroup } from "../../hooks";
import { Divider } from "../divider";
import { Stack, StackProps } from "../stack";

export interface SidebarGroupPanelProps extends StackProps {}

export const SidebarGroupPanel = ({
  children,
  ...props
}: SidebarGroupPanelProps) => {
  const { isOpen } = useSidebarGroup();
  return (
    <Stack
      width="full"
      padding="3"
      paddingLeft="6"
      direction="row"
      spacing="0"
      display={isOpen ? "flex" : "none"}
      {...props}
    >
      <Divider orientation="vertical" />
      <Stack width="full" align="center" direction="column">
        {children}
      </Stack>
    </Stack>
  );
};
