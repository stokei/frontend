import { Text } from "@stokei/ui";

import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";

interface CatalogSelectItemContentProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItemContent = ({
  catalog,
}: CatalogSelectItemContentProps) => {
  return <Text fontWeight="bold">{catalog?.title}</Text>;
};
