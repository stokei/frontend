import React, { PropsWithChildren, useMemo } from "react";

export { ColorModeScript } from "@chakra-ui/react";

export interface SelectContextValues<TValue = any> {
  readonly id: string;
  readonly value: TValue;
  readonly hasValue: boolean;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly isMultiple?: boolean;
  readonly onChange: (value: TValue) => void;
}

export interface SelectContextProps<TValue = any> {
  readonly id: string;
  readonly value: TValue;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly onChange: (value: TValue) => void;
}

export const SelectContext = React.createContext({} as SelectContextValues);

export const SelectProvider = ({
  id,
  value,
  children,
  isLoading,
  isDisabled,
  onChange,
}: PropsWithChildren<SelectContextProps>) => {
  const isMultiple = useMemo(() => value && Array.isArray(value), [value]);
  const hasValue = useMemo(() => {
    if (typeof value === "undefined") {
      return false;
    }
    if (typeof value === "boolean") {
      return true;
    }
    const isArray = Array.isArray(value);
    if (isArray) {
      return !!value?.length;
    }
    return !!value;
  }, [value]);

  const configValues: SelectContextValues = useMemo(
    () => ({
      id,
      value,
      hasValue,
      isMultiple,
      isLoading,
      isDisabled,
      onChange,
    }),
    [id, value, hasValue, isMultiple, isLoading, isDisabled, onChange]
  );

  return (
    <SelectContext.Provider value={configValues}>
      {children}
    </SelectContext.Provider>
  );
};
