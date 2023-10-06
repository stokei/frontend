import { Box, Container, Loading, SimpleGrid, Text, Title } from "@stokei/ui";
import { FC, useMemo } from "react";
import { OrderBy } from "../../../services/graphql/stokei";
import { BaseComponentReadable } from "../../../types/base-component-readable";
import { CatalogItem } from "../components/catalog-item";
import { useBuilderComponentCatalogItemsQuery } from "../graphql/catalog-items.query.graphql.generated";
import { useBuilderComponentCatalogQuery } from "../graphql/catalog.query.graphql.generated";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = ({
  data,
  ...props
}) => {
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
                      productId={product?.id}
                      name={product?.name}
                      avatar={product?.avatar?.file?.url || ""}
                      defaultPrice={product?.defaultPrice}
                      prices={product?.prices}
                      parent={product?.parent}
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
