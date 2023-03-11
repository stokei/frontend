import { Stack } from "@stokei/ui";
import { FC } from "react";
import { CatalogsQuery } from "../../graphql/catalogs.query.graphql.generated";
import { CatalogItem } from "../catalog-item";

interface CatalogsListProps {
  catalogs?: CatalogsQuery["catalogs"];
}

export const CatalogsList: FC<CatalogsListProps> = ({ catalogs }) => {
  return (
    <Stack direction="column" spacing="10">
      {catalogs?.items?.map(
        (catalog) =>
          !!catalog?.items?.totalCount && (
            <CatalogItem key={catalog?.id} catalog={catalog} />
          )
      )}
    </Stack>
  );
};
