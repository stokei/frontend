import { useDisclosure } from "@stokei/ui";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export interface SidebarProviderProps {}

export interface SidebarProviderValues {
  readonly isOpenSidebar: boolean;
  readonly onToggleSidebar: () => void;
}

export const SidebarContext = createContext({} as SidebarProviderValues);

export const SidebarProvider: FC<PropsWithChildren<SidebarProviderProps>> = ({
  children,
}) => {
  const { isOpen: isOpenSidebar, onToggle: onToggleSidebar } = useDisclosure();
  const values: SidebarProviderValues = useMemo(
    () => ({
      isOpenSidebar,
      onToggleSidebar,
    }),
    [isOpenSidebar, onToggleSidebar]
  );

  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};
