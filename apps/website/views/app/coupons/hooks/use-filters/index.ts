import { useCallback, useState } from "react";

export const useFilters = () => {
  const [codeFilter, setCodeFilter] = useState<string>("");

  const onCleanFilters = useCallback(() => {
    setCodeFilter("");
  }, []);

  return {
    codeFilter,
    setCodeFilter,
    onCleanFilters,
  };
};
