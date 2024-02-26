import { SelectItem } from "@stokei/ui";
import { memo } from "react";
import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";
import { CatalogSelectItemContent } from "../catalog-select-item-content";

interface CatalogSelectItemProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItem = memo(({ catalog }: CatalogSelectItemProps) => {
  return (
    <SelectItem value={catalog}>
      <CatalogSelectItemContent catalog={catalog} />
    </SelectItem>
  );
});

CatalogSelectItem.displayName = "CatalogSelectItem";
