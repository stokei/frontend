import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useDisclosure } from "../../hooks";

export interface SidebarGroupContextValues {
  readonly isOpen: boolean;
  readonly isActive: boolean;
  readonly onToggle: () => void;
}

export interface SidebarGroupContextProps {
  readonly isActive: boolean;
}

export const SidebarGroupContext = React.createContext(
  {} as SidebarGroupContextValues
);

export const SidebarGroupProvider: React.FC<
  PropsWithChildren<SidebarGroupContextProps>
> = ({ isActive, children }) => {
  const { isOpen, onToggle, onOpen } = useDisclosure();

  const configValues: SidebarGroupContextValues = useMemo(
    () => ({
      isOpen,
      isActive,
      onToggle,
    }),
    [isOpen, isActive, onToggle]
  );

  useEffect(() => {
    if (isActive) {
      onOpen();
    }
  }, [isActive, onOpen]);

  return (
    <SidebarGroupContext.Provider value={configValues}>
      {children}
    </SidebarGroupContext.Provider>
  );
};
