import { Box, Container, Loading, SimpleGrid, Text, Title } from "@stokei/ui";
import { useMemo } from "react";
import { OrderBy } from "../../../services/graphql/stokei";
import { BaseComponentReadable } from "../../../types/base-component-readable";
import { CatalogItem } from "../components/catalog-item";
import { useBuilderComponentCatalogItemsQuery } from "../graphql/catalog-items.query.graphql.generated";
import { useBuilderComponentCatalogQuery } from "../graphql/catalog.query.graphql.generated";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable = ({
  data,
  onRedirect,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  const [{ fetching: isLoadingCatalog, data: dataCatalog }] =
    useBuilderComponentCatalogQuery({
      pause: !dataProps?.catalog,
      variables: {
        catalog: dataProps?.catalog || "",
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
                <SimpleGrid columns={[1, 1, 2, 4]} spacing="5">
                  {catalogItems?.map(({ product }) => (
                    <CatalogItem
                      key={product?.id}
                      product={product}
                      onRedirect={onRedirect}
                    />
                  ))}
                </SimpleGrid>
              </Container>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
