import { SelectCatalogValue } from "@/components/select-catalogs";
import { useCallback, useState } from "react";

export const useSelectCatalogs = () => {
  const [catalogs, setCatalogs] = useState<SelectCatalogValue[]>([]);

  const onChooseCatalog = useCallback(
    (newCatalog: SelectCatalogValue) =>
      setCatalogs((currentCatalogs) => [...currentCatalogs, newCatalog]),
    []
  );
  const onRemoveCatalog = useCallback(
    (catalogRemoved: SelectCatalogValue) =>
      setCatalogs((currentCatalogs) =>
        currentCatalogs.filter(
          (currentCatalog) => catalogRemoved.id !== currentCatalog.id
        )
      ),
    []
  );
  const onResetCatalog = useCallback(() => setCatalogs([]), []);

  return {
    catalogs,
    onChooseCatalog,
    onRemoveCatalog,
    onResetCatalog,
  };
};
