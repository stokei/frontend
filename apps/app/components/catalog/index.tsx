import {
  Box,
  Container,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  SimpleGrid,
  Text,
  Title,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";

import { CatalogItem } from "../catalog-item";

import { useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { useCatalogItemsQuery } from "./graphql/catalog-items.query.graphql.generated";

export interface CatalogProps {
  readonly catalogId?: string;
  readonly title?: string;
  readonly subtitle?: string | null;
  readonly maxItems?: number;
}

export const Catalog: FC<CatalogProps> = memo(
  ({ catalogId, title, subtitle, maxItems }) => {
    const translate = useTranslations();
    const [{ fetching: isLoading, data: dataCatalogItems }] =
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
          orderBy: {
            createdAt: OrderBy.Desc,
          },
          page: {
            limit: maxItems,
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
          <Title fontSize="xl">{title}</Title>
          {subtitle && (
            <Text fontSize="sm" marginBottom="5" color="text.300">
              {subtitle}
            </Text>
          )}
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!catalogItems?.length ? (
              <NotFound>
                <NotFoundIcon name="course" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "productsNotFound" })}
                </NotFoundSubtitle>
              </NotFound>
            ) : (
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
  }
);

Catalog.displayName = "Catalog";
