import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Icon,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";

import { CatalogItem } from "../catalog-item";

import { useTranslations } from "@/hooks";
import { SortedItemComponentCatalogItemFragment } from "../sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";
import { useRouter } from "next/router";
import { routes } from "@/routes";

export interface CatalogProps {
  readonly catalogId?: string;
  readonly items?: SortedItemComponentCatalogItemFragment[];
  readonly title?: string;
  readonly subtitle?: string | null;
}

export const Catalog: FC<CatalogProps> = memo(
  ({ catalogId, title, subtitle, items: catalogItemsProp }) => {
    const router = useRouter();
    const translate = useTranslations();

    const catalogItems = useMemo(() => {
      const sortedItems = catalogItemsProp?.sort((itemA, itemB) => {
        if (!itemB.product.defaultPrice) {
          return -1;
        }
        return 1;
      });
      return sortedItems;
    }, [catalogItemsProp]);

    return (
      <Box flexDirection="column" as="section" paddingY="5">
        <Container marginBottom="5">
          <Stack
            direction={["column", "column", "row", "row"]}
            justify="space-between"
          >
            <Box width="full" flexDirection="column">
              <Title fontSize="xl">{title}</Title>
              {subtitle && (
                <Text fontSize="sm" marginBottom="5" color="text.300">
                  {subtitle}
                </Text>
              )}
            </Box>
            <ButtonGroup width="fit-content">
              <Button
                variant="outline"
                leftIcon={<Icon name="arrowRight" />}
                onClick={() =>
                  router.push({
                    pathname: routes.store.home,
                    query: {
                      catalog: catalogId,
                    },
                  })
                }
              >
                {translate.formatMessage({ id: "seeAll" })}
              </Button>
            </ButtonGroup>
          </Stack>
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
                {catalogItems?.map(({ product, catalogItemId }) => (
                  <CatalogItem
                    key={catalogItemId}
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
      </Box>
    );
  }
);

Catalog.displayName = "Catalog";
