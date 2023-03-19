import React, { PropsWithChildren, useMemo } from "react";

export { ColorModeScript } from "@chakra-ui/react";

export interface SelectContextValues {
  readonly value: any;
  readonly hasValue: boolean;
  readonly options?: string[];
  readonly isOpenList?: boolean;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly isMultiple?: boolean;
  readonly onOpenList: () => void;
  readonly onToggleList: () => void;
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
  readonly onToggleList: () => void;
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
  onToggleList,
  onCloseList,
  onChooseItem,
  onRemoveChooseItem,
  value,
}) => {
  const isMultiple = useMemo(() => value && Array.isArray(value), [value]);
  const hasValue = useMemo(() => {
    const isArray = Array.isArray(value);
    if (isArray) {
      return !!value?.length;
    }
    return !!value;
  }, [value]);

  const configValues: SelectContextValues = useMemo(
    () => ({
      value,
      hasValue,
      isMultiple,
      isOpenList,
      isLoading,
      isDisabled,
      onOpenList,
      onCloseList,
      onToggleList,
      onChooseItem,
      onRemoveChooseItem,
    }),
    [
      value,
      hasValue,
      isMultiple,
      isOpenList,
      isLoading,
      isDisabled,
      onOpenList,
      onCloseList,
      onToggleList,
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
