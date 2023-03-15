import { Box, Container, Text, Title } from "@stokei/ui";
import { FC, memo, useMemo } from "react";
import { useCatalogItemsQuery } from "../../views/landing-page/graphql/catalog-items.query.graphql.generated";

import { CatalogItem } from "../catalog-item";

export interface CatalogProps {
  readonly catalogId?: string;
  readonly title?: string;
  readonly subtitle?: string | null;
}

export const Catalog: FC<CatalogProps> = memo(
  ({ catalogId, title, subtitle }) => {
    const [{ data: dataCatalogItems, fetching: isLoadingCatalogItems }] =
      useCatalogItemsQuery({
        pause: !catalogId,
        variables: {
          where: {
            AND: {
              catalog: {
                equals: catalogId,
              },
            },
          },
        },
      });

    const catalogItems = useMemo(
      () => dataCatalogItems?.catalogItems?.items,
      [dataCatalogItems]
    );

    return (
      <Box flexDirection="column" as="section" paddingY="5">
        <Container>
          <Title fontSize="lg">{title}</Title>
          {subtitle && <Text marginBottom="5">{subtitle}</Text>}
        </Container>
        {!!catalogItems?.length && (
          <Box flexDirection="row" overflowY="hidden">
            <Container
              flexDirection="row"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              paddingLeft="0"
            >
              {catalogItems?.map(({ product }) => (
                <Box key={product?.id} flexDirection="column" paddingLeft="5">
                  <CatalogItem
                    productId={product?.id}
                    name={product?.name}
                    avatar={product?.avatar?.file?.url || ""}
                    defaultPrice={product?.defaultPrice}
                    parent={product?.parent}
                  />
                </Box>
              ))}
            </Container>
          </Box>
        )}
      </Box>
    );
  }
);
