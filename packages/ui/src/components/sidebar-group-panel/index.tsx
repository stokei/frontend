import { useSidebarGroup } from "../../hooks";
import { Divider } from "../divider";
import { Stack, StackProps } from "../stack";

export interface SidebarGroupPanelProps extends StackProps {
  withDivider?: boolean;
}

export const SidebarGroupPanel = ({
  children,
  withDivider = true,
  ...props
}: SidebarGroupPanelProps) => {
  const { isOpen } = useSidebarGroup();
  return (
    <Stack
      width="full"
      padding="3"
      paddingLeft={withDivider ? "6" : "0"}
      direction="row"
      spacing="0"
      display={isOpen ? "flex" : "none"}
      {...props}
    >
      {withDivider && <Divider orientation="vertical" />}
      <Stack width="full" align="center" direction="column">
        {children}
      </Stack>
    </Stack>
  );
};
