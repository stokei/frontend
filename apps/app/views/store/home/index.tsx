import { ProductType } from "@/constants/product-type";
import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { useStoreFilters } from "../hooks/use-filters";
import { StoreLayout } from "../layout";
import { Header } from "./components/header";
import { ProductFilters } from "./components/product-filters";
import { ProductsList } from "./components/products-list";
import { useGetStoreProductsQuery } from "./graphql/products.query.graphql.generated";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { filters } = useStoreFilters();
  const { currentPage, onChangePage } = usePagination();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const [{ data: dataProducts, fetching: isLoadingProducts }] =
    useGetStoreProductsQuery({
      pause: !currentApp?.id,
      variables: {
        orderBy: {
          createdAt: OrderBy.Desc,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            ...(filters?.productType !== ProductType.ALL && {
              parent: {
                startsWith: filters?.productType?.toLowerCase(),
              },
            }),
            ...(filters?.productName && {
              name: {
                startsWith: filters?.productName,
              },
            }),
          },
        },
      },
    });

  const products = useMemo(
    () => dataProducts?.products?.items || [],
    [dataProducts?.products?.items]
  );

  return (
    <StoreLayout>
      <Container paddingY="5">
        <ProductFilters
          isOpen={isOpenFiltersDrawer}
          onClose={onToggleFiltersDrawer}
        />
        <Stack direction="column" spacing="5">
          <Header
            productsTotalCount={dataProducts?.products?.totalCount || 0}
            onOpenFilters={onToggleFiltersDrawer}
          />
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
                currentPage={currentPage}
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