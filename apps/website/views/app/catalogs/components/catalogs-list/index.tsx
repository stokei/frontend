import { FC } from "react";
import { SimpleGrid } from "@stokei/ui";
import { AdminCatalogsPageCatalogFragment } from "../../graphql/catalogs.query.graphql.generated";
import { CatalogItem } from "../catalog-item";

interface CatalogsListProps {
  readonly catalogs?: AdminCatalogsPageCatalogFragment[];
}

export const CatalogsList: FC<CatalogsListProps> = ({ catalogs }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {catalogs?.map((catalog) => (
        <CatalogItem key={catalog?.id} catalog={catalog} />
      ))}
    </SimpleGrid>
  );
};
