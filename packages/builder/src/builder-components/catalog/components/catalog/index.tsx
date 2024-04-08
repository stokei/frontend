import {
  Box,
  Container,
  Loading,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useMemo } from "react";
import { OrderBy } from "../../../../services/graphql/stokei";
import { useBuilderComponentCatalogItemsQuery } from "../../graphql/catalog-items.query.graphql.generated";
import { useBuilderComponentCatalogQuery } from "../../graphql/catalog.query.graphql.generated";
import { CatalogItem } from "../catalog-item";

interface CatalogProps {
  readonly catalogId: string;
  readonly onRedirect: (route: string) => void;
}

export const Catalog = ({ catalogId, onRedirect, ...props }: CatalogProps) => {
  const [{ fetching: isLoadingCatalog, data: dataCatalog }] =
    useBuilderComponentCatalogQuery({
      pause: !catalogId,
      variables: {
        catalog: catalogId || "",
      },
    });

  const catalog = useMemo(() => dataCatalog?.catalog, [dataCatalog]);

  const [{ fetching: isLoadingCatalogItems, data: dataCatalogItems }] =
    useBuilderComponentCatalogItemsQuery({
      pause: !catalog?.id,
      variables: {
        where: {
          AND: {
            catalog: {
              equals: catalog?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
      },
    });

  const catalogItems = useMemo(() => {
    const items = dataCatalogItems?.catalogItems?.items;
    const sortedItems = items?.sort((itemA, itemB) => {
      if (!itemB.product.defaultPrice) {
        return -1;
      }
      return 1;
    });
    return sortedItems;
  }, [dataCatalogItems]);

  return (
    <Box flexDirection="column" as="section" paddingY="5">
      <Container marginBottom="5">
        <Title fontSize="xl">{catalog?.title}</Title>
        {catalog?.subtitle && (
          <Text fontSize="sm" marginBottom="5" color="text.300">
            {catalog?.subtitle}
          </Text>
        )}
      </Container>
      {isLoadingCatalog ? (
        <Loading />
      ) : (
        <>
          {!!catalogItems?.length && (
            <Box flexDirection="row" overflowY="hidden">
              <Container>
                <Stack
                  direction={["column", "column", "row", "row"]}
                  spacing="5"
                >
                  {catalogItems?.map(({ product }) => (
                    <CatalogItem
                      key={product?.id}
                      product={product}
                      onRedirect={onRedirect}
                    />
                  ))}
                </Stack>
              </Container>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
