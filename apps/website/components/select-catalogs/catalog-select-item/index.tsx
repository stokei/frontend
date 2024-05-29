import { MultiSelectOption } from "@stokei/ui";

import { CatalogSelectItemContent } from "../catalog-select-item-content";
import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";

interface CatalogSelectItemProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItem = ({ catalog }: CatalogSelectItemProps) => {
  return (
    <MultiSelectOption value={catalog}>
      <CatalogSelectItemContent catalog={catalog} />
    </MultiSelectOption>
  );
};
