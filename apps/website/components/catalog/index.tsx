import {
  Box,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
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

    const catalogItems = useMemo(
      () => dataSortedItems?.sortedItems?.items,
      [dataSortedItems]
    );

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
              {catalogItems?.map(
                ({ item }) =>
                  item?.__typename === "CatalogItem" && (
                    <Box
                      key={item?.product?.id}
                      flexDirection="column"
                      paddingLeft="5"
                    >
                      <CatalogItem
                        productId={item?.product?.id}
                        name={item?.product?.name}
                        avatar={item?.product?.avatar?.file?.url || ""}
                        defaultPrice={item?.product?.defaultPrice}
                        parent={item?.product?.parent}
                      />
                    </Box>
                  )
              )}
            </Container>
          </Box>
        )}
      </Box>
    );
  }
);

Catalog.displayName = "Catalog";
