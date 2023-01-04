import React, { PropsWithChildren, useMemo } from "react";

export { ColorModeScript } from "@chakra-ui/react";

export interface SelectContextValues {
  readonly value: any;
  readonly options?: string[];
  readonly isOpenList?: boolean;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly isMultiple?: boolean;
  readonly onOpenList: () => void;
  readonly onCloseList: () => void;
  readonly onChooseItem: (value: string) => void;
  readonly onRemoveChooseItem: (value: string) => void;
}

export interface SelectContextProps {
  readonly value: any;
  readonly isOpenList?: boolean;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly onOpenList: () => void;
  readonly onCloseList: () => void;
  readonly onChooseItem: (value: string) => void;
  readonly onRemoveChooseItem: (value: string) => void;
}

export const SelectContext = React.createContext({} as SelectContextValues);

export const SelectProvider: React.FC<
  PropsWithChildren<SelectContextProps>
> = ({
  children,
  isOpenList,
  isLoading,
  isDisabled,
  onOpenList,
  onCloseList,
  onChooseItem,
  onRemoveChooseItem,
  value,
}) => {
  const isMultiple = useMemo(() => value && Array.isArray(value), [value]);

  const configValues: SelectContextValues = useMemo(
    () => ({
      value,
      isMultiple,
      isOpenList,
      isLoading,
      isDisabled,
      onOpenList,
      onCloseList,
      onChooseItem,
      onRemoveChooseItem,
    }),
    [
      value,
      isMultiple,
      isOpenList,
      isLoading,
      isDisabled,
      onOpenList,
      onCloseList,
      onChooseItem,
      onRemoveChooseItem,
    ]
  );

  return (
    <SelectContext.Provider value={configValues}>
      {children}
    </SelectContext.Provider>
  );
};
