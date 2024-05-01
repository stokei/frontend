import { SelectItem } from "@stokei/ui";

import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";
import { CatalogSelectItemContent } from "../catalog-select-item-content";

interface CatalogSelectItemProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItem = ({ catalog }: CatalogSelectItemProps) => {
  return (
    <SelectItem value={catalog}>
      <CatalogSelectItemContent catalog={catalog} />
    </SelectItem>
  );
};
