import { useTranslations } from "@/hooks";
import { Box, Card, CardBody, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { AdminCatalogsPageCatalogFragment } from "../../graphql/catalogs.query.graphql.generated";

export interface CatalogItemProps {
  readonly catalog: AdminCatalogsPageCatalogFragment;
}

export const CatalogItem: FC<CatalogItemProps> = memo(({ catalog }) => {
  const translate = useTranslations();

  return (
    <Card background="background.50">
      <CardBody>
        <Box width="full" flexDirection="column" height="full">
          <Title size="md" marginBottom="5">
            {catalog?.title}
          </Title>
        </Box>
      </CardBody>
    </Card>
  );
});

CatalogItem.displayName = "CatalogItem";
