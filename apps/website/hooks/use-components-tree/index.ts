import { ComponentsTreeContext } from "@/contexts";
import { useContext } from "react";

export const useComponentsTree = () => useContext(ComponentsTreeContext);
