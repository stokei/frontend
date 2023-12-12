import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagList,
  useDisclosure,
  useTags,
  UseTagsTagItem,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useStoreFilters } from "../hooks/use-filters";
import { StoreLayout } from "../layout";
import { Header } from "./components/header";
import { ProductFilters } from "./components/product-filters";
import { ProductsList } from "./components/products-list";
import { useGetStoreCatalogItemsQuery } from "./graphql/catalog-items.query.graphql.generated";
import { useGetStoreCatalogsQuery } from "./graphql/catalogs.query.graphql.generated";
import { useGetStoreProductsQuery } from "./graphql/products.query.graphql.generated";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { filters, onChangeFilter } = useStoreFilters();
  const { tags, onAddTags, onClearTags } = useTags();

  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const [{ data: dataCatalogs, fetching: isLoadingCatalogs }] =
    useGetStoreCatalogsQuery({
      pause: !currentApp?.id,
      variables: {
        orderBy: {
          title: OrderBy.Asc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  const [{ data: dataCatalogItems, fetching: isLoadingCatalogItems }] =
    useGetStoreCatalogItemsQuery({
      pause: !currentApp?.id || !filters?.catalog,
      variables: {
        where: {
          AND: {
            catalog: {
              equals: filters?.catalog,
            },
          },
        },
      },
    });

  const catalogItemsProductsIds = useMemo(
    () =>
      dataCatalogItems?.catalogItems?.items?.map(
        (catalogItem) => catalogItem?.product?.id
      ),
    [dataCatalogItems?.catalogItems?.items]
  );

  const [{ data: dataProducts, fetching: isLoadingProducts }] =
    useGetStoreProductsQuery({
      pause: !currentApp?.id,
      variables: {
        page: {
          limit: 36,
          number: filters?.page || 1,
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
        where: {
          AND: {
            ...(!!catalogItemsProductsIds?.length && {
              ids: catalogItemsProductsIds,
            }),
            app: {
              equals: currentApp?.id,
            },
            ...(filters?.productName && {
              name: {
                search: filters?.productName,
              },
            }),
          },
        },
      },
    });

  const catalogs = useMemo(
    () => dataCatalogs?.catalogs?.items || [],
    [dataCatalogs?.catalogs?.items]
  );

  const products = useMemo(() => {
    const productsList = dataProducts?.products?.items || [];
    const sortedProducts = productsList?.sort((itemA, itemB) => {
      if (!itemB.prices?.items?.length) {
        return -1;
      }
      return 1;
    });
    return sortedProducts;
  }, [dataProducts?.products?.items]);

  useEffect(() => {
    const tagsList: UseTagsTagItem[] = [];
    if (filters?.productName) {
      tagsList.push({
        id: filters?.productName,
        label: filters?.productName,
        onRemove: () => {
          onChangeFilter({
            productName: "",
          });
        },
      });
    }
    if (filters?.catalog) {
      const catalog = catalogs?.find(
        (currentCatalog) => currentCatalog?.id === filters.catalog
      );
      if (catalog) {
        tagsList.push({
          id: catalog?.id,
          label: catalog?.title,
          onRemove: () => {
            onChangeFilter({
              catalog: "",
            });
          },
        });
      }
    }
    if (tagsList?.length) {
      onAddTags(tagsList);
    }
    return () => onClearTags();
  }, [catalogs, filters, onAddTags, onChangeFilter, onClearTags]);

  const onChangePage = useCallback(
    (page: number) => onChangeFilter({ page }),
    [onChangeFilter]
  );

  return (
    <StoreLayout>
      <Container paddingY="5">
        <ProductFilters
          catalogs={catalogs}
          isOpen={isOpenFiltersDrawer}
          onClose={onToggleFiltersDrawer}
        />
        <Stack direction="column" spacing="5">
          <Header
            productsTotalCount={dataProducts?.products?.totalCount || 0}
            onOpenFilters={onToggleFiltersDrawer}
          />

          {tags?.length && (
            <TagList>
              {tags?.map((tag) => (
                <Tag key={tag?.id}>
                  <TagLabel>{tag?.label}</TagLabel>
                  <TagCloseButton onClick={tag?.onRemove} />
                </Tag>
              ))}
            </TagList>
          )}

          {isLoadingProducts ? (
            <Loading />
          ) : (
            <>
              {!products?.length ? (
                <NotFound>
                  <NotFoundIcon name="product" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "productsNotFound" })}
                  </NotFoundSubtitle>
                </NotFound>
              ) : (
                <ProductsList products={products} />
              )}
            </>
          )}

          {dataProducts?.products?.totalPages &&
            dataProducts?.products?.totalPages > 1 && (
              <Pagination
                currentPage={filters?.page || 1}
                onChangePage={onChangePage}
                hasNextPage={!!dataProducts?.products?.hasNextPage}
                hasPreviousPage={!!dataProducts?.products?.hasPreviousPage}
                totalPages={dataProducts?.products?.totalPages || 1}
              />
            )}
        </Stack>
      </Container>
    </StoreLayout>
  );
};
