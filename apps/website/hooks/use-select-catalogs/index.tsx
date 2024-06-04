import { SelectCatalogValue } from "@/components/select-catalogs";
import { addOrRemoveItemFromArray } from "@stokei/utils";
import { useCallback, useState } from "react";

export const useSelectCatalogs = () => {
  const [catalogs, setCatalogs] = useState<SelectCatalogValue[]>([]);

  const onChooseCatalog = useCallback(
    (catalog: SelectCatalogValue) =>
      setCatalogs((currentCatalogs) => addOrRemoveItemFromArray(currentCatalogs, catalog, 'id')),
    []
  );

  const onResetCatalog = useCallback(() => setCatalogs([]), []);

  return {
    catalogs,
    onChooseCatalog,
    onResetCatalog,
  };
};
