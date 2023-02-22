import { useContext } from "react";
import { SidebarGroupContext } from "../../contexts";

export const useSidebarGroup = () => useContext(SidebarGroupContext);
