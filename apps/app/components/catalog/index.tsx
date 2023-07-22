import {
  Box,
  Container,
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
import { useSortedItemsQuery } from "./graphql/sorted-items.query.graphql.generated";

export interface CatalogProps {
  readonly catalogId?: string;
  readonly title?: string;
  readonly subtitle?: string | null;
}

export const Catalog: FC<CatalogProps> = memo(
  ({ catalogId, title, subtitle }) => {
    const translate = useTranslations();
    const [{ fetching: isLoading, data: dataSortedItems }] =
      useSortedItemsQuery({
        pause: !catalogId,
        variables: {
          where: {
            AND: {
              parent: {
                equals: catalogId,
              },
            },
          },
        },
      });

    const catalogItems = useMemo(() => {
      const items = dataSortedItems?.sortedItems?.items;
      const sortedItems = items?.sort((itemA, itemB) => {
        if (
          itemA.item?.__typename === "CatalogItem" &&
          itemB.item?.__typename === "CatalogItem"
        ) {
          if (!itemB.item?.product.defaultPrice) {
            return -1;
          }
          return 1;
        }
        return 1;
      });
      return sortedItems;
    }, [dataSortedItems]);

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
                {catalogItems?.map(
                  ({ item }) =>
                    item?.__typename === "CatalogItem" && (
                      <CatalogItem
                        key={item?.product?.id}
                        productId={item?.product?.id}
                        name={item?.product?.name}
                        avatar={item?.product?.avatar?.file?.url || ""}
                        defaultPrice={item?.product?.defaultPrice}
                        parent={item?.product?.parent}
                      />
                    )
                )}
              </SimpleGrid>
            </Container>
          </Box>
        )}
      </Box>
    );
  }
);

Catalog.displayName = "Catalog";
