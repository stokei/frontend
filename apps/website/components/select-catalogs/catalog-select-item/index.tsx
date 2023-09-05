import { SelectItem } from "@stokei/ui";
import { FC, memo } from "react";
import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";
import { CatalogSelectItemContent } from "../catalog-select-item-content";

interface CatalogSelectItemProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItem: FC<CatalogSelectItemProps> = memo(
  ({ catalog }) => {
    return (
      <SelectItem value={catalog}>
        <CatalogSelectItemContent catalog={catalog} />
      </SelectItem>
    );
  }
);

CatalogSelectItem.displayName = "CatalogSelectItem";
