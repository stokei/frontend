import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useDisclosure } from "../../hooks";

export interface SidebarGroupContextValues {
  readonly isOpen: boolean;
  readonly isActive: boolean;
  readonly onToggle: () => void;
}

export interface SidebarGroupContextProps {
  readonly isActive: boolean;
  readonly startActive?: boolean;
}

export const SidebarGroupContext = React.createContext(
  {} as SidebarGroupContextValues
);

export const SidebarGroupProvider = ({
  startActive,
  isActive,
  children,
}: PropsWithChildren<SidebarGroupContextProps>) => {
  const { isOpen, onToggle, onOpen } = useDisclosure({
    startOpen: !!startActive,
  });

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
