import { useSidebar } from "@/hooks";
import { IconButton, IconButtonProps } from "@stokei/ui";
import { FC } from "react";

interface SidebarOpenButtonProps extends Omit<IconButtonProps, "name"> {}

export const SidebarOpenButton: FC<SidebarOpenButtonProps> = ({ ...props }) => {
  const { onToggleSidebar } = useSidebar();
  return (
    <IconButton
      marginTop="1"
      marginRight="5"
      variant="ghost"
      color="text.500"
      onClick={onToggleSidebar}
      display={["block", "block", "none", "none"]}
      {...props}
      name="menu"
    />
  );
};
