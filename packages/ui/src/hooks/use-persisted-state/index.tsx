import cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

const initializeState = (key: string) => {
  const currentValue = cookies.get(key);
  if (!currentValue) {
    return;
  }
  try {
    return JSON.parse(currentValue);
  } catch (e) {
    return;
  }
};

export function usePersistedState<TValue = any>({ key }: { key: string }) {
  const [value, setValue] = useState<TValue>();

  useEffect(() => {
    setValue(initializeState(key));
  }, [key]);

  const onSetValue = useCallback(
    (currentValue: (prevState: TValue | undefined) => TValue | undefined) => {
      setValue((prevState) => {
        if (typeof currentValue === "function") {
          const newValue = currentValue(prevState);
          if (newValue) {
            cookies.set(key, JSON.stringify(newValue));
            return newValue;
          }
        } else {
          cookies.set(key, JSON.stringify(currentValue));
          return currentValue;
        }
        return prevState;
      });
    },
    [key]
  );

  return { value, setValue: onSetValue };
}
