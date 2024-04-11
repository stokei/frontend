import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Box,
  Button,
  Card,
  CardBody,
  Description,
  Stack,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";

import { AdminCatalogsPageCatalogFragment } from "../../graphql/catalogs.query.graphql.generated";

export interface CatalogItemProps {
  readonly catalog: AdminCatalogsPageCatalogFragment;
}

export const CatalogItem = ({ catalog }: CatalogItemProps) => {
  const translate = useTranslations();
  const router = useRouter();
  const { currentApp } = useCurrentApp();

  const goToCatalog = () => {
    router.push(
      websiteRoutes
        .app({ appId: currentApp?.id })
        .catalog({ catalog: catalog?.id }).home
    );
  };

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Box flexDirection="column">
            <Title fontSize="lg">{catalog?.title}</Title>
            {catalog?.subtitle && (
              <Description>{catalog?.subtitle}</Description>
            )}
          </Box>
          <Button onClick={goToCatalog}>
            {translate.formatMessage({ id: "view" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
