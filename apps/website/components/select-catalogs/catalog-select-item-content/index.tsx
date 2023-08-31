import { Text } from "@stokei/ui";
import { FC } from "react";
import { AppCatalogFragment } from "../graphql/catalogs.query.graphql.generated";

interface CatalogSelectItemContentProps {
  readonly catalog?: AppCatalogFragment;
}

export const CatalogSelectItemContent: FC<CatalogSelectItemContentProps> = ({
  catalog,
}) => {
  return <Text fontWeight="bold">{catalog?.title}</Text>;
};
