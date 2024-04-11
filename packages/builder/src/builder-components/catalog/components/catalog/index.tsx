import {
  Box,
  Button,
  Icon,
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
import { useBuilder, useTranslations } from "../../../../hooks";

interface CatalogProps {
  readonly catalogId: string;
  readonly onRedirect: (route: string) => void;
}

export const Catalog = ({ catalogId, onRedirect, ...props }: CatalogProps) => {
  const translate = useTranslations();
  const { routes } = useBuilder();
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
    <Stack direction="column" as="section" spacing="5">
      <Stack direction="column" spacing="1">
        <Title fontSize="xl">{catalog?.title}</Title>
        {catalog?.subtitle && (
          <Text fontSize="sm" color="text.300">
            {catalog?.subtitle}
          </Text>
        )}
      </Stack>
      {isLoadingCatalog ? (
        <Loading />
      ) : (
        <>
          {!!catalogItems?.length && (
            <Stack direction="column" spacing="5">
              <SimpleGrid columns={[1, 1, 2, 4]} spacing="5">
                {isLoadingCatalogItems ? (
                  <Loading />
                ) : (
                  <>
                    {catalogItems?.map(({ product }) => (
                      <CatalogItem
                        key={product?.id}
                        product={product}
                        onRedirect={onRedirect}
                      />
                    ))}
                  </>
                )}
              </SimpleGrid>
              <Box width="full" justifyContent="center">
                <Button
                  rightIcon={<Icon name="arrowRight" />}
                  onClick={() =>
                    onRedirect(routes.store({ catalog: catalogId }))
                  }
                >
                  {translate.formatMessage({ id: "seeAllProducts" })}
                </Button>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};
