import { useCallback, useState } from "react";

export const useFilters = () => {
  const [codeFilter, setCodeFilter] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(true);

  const onCleanFilters = useCallback(() => {
    setCodeFilter("");
    setActiveFilter(undefined);
  }, []);

  return {
    codeFilter,
    activeFilter,
    setCodeFilter,
    setActiveFilter,
    onCleanFilters,
  };
};
