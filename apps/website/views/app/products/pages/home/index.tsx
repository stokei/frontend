import { OnboardingAlerts } from "@/components/onboarding-alerts";
import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { ProductFilters } from "./components/product-filters";
import { ProductsList } from "./components/products-list";
import {
  AdminProductPageProductFragment,
  useGetAdminProductPageProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { Loading } from "./loading";

interface ProductsPageProps {}

export const ProductsPage: FC<ProductsPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const [filteredProducts, setFilteredProducts] = useState<
    AdminProductPageProductFragment[]
  >([]);
  const [products, setProducts] = useState<AdminProductPageProductFragment[]>(
    []
  );
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();
  const isCompleteIntegrations = useMemo(
    () => !!currentApp?.isIntegratedWithStripe || !!currentApp?.isStokei,
    [currentApp]
  );
  const filteredProductsIds = useMemo(
    () => filteredProducts?.map((product) => product?.id),
    [filteredProducts]
  );

  const [{ fetching: isLoading, data: dataProducts }] =
    useGetAdminProductPageProductsQuery({
      pause: !currentApp,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            ...(filteredProductsIds?.length > 0 && {
              ids: filteredProductsIds,
            }),
          },
        },
        orderBy: {
          createdAt: OrderBy.Asc,
        },
      },
    });

  useEffect(() => {
    setProducts(dataProducts?.products?.items || []);
  }, [dataProducts]);

  const goToAddProduct = () => {
    router.push(routes.app({ appId: currentApp?.id }).products.add);
  };

  const onChooseFilteredProduct = useCallback(
    (filteredProduct?: AdminProductPageProductFragment) => {
      if (filteredProduct) {
        setFilteredProducts((filteredProducts) => [
          ...filteredProducts,
          filteredProduct,
        ]);
      }
    },
    []
  );
  const onRemoveFilteredProduct = useCallback(
    (filteredProductRemoved?: AdminProductPageProductFragment) => {
      if (filteredProductRemoved) {
        setFilteredProducts((filteredProducts) =>
          filteredProducts?.filter(
            (filteredProduct) =>
              filteredProduct?.id !== filteredProductRemoved?.id
          )
        );
      }
    },
    []
  );

  return (
    <AppLayout>
      <Navbar />
      <ProductFilters
        isOpen={isOpenFiltersDrawer}
        onClose={onToggleFiltersDrawer}
        currentProducts={filteredProducts}
        onChooseCurrentProduct={onChooseFilteredProduct}
        onRemoveChooseCurrentProduct={onRemoveFilteredProduct}
        onResetCurrentProducts={() => setFilteredProducts([])}
      />
      {dataProducts?.products?.totalCount && (
        <Container paddingTop="5">
          <Header
            productsTotalCount={dataProducts?.products?.totalCount || 0}
            onOpenFilters={onToggleFiltersDrawer}
          />
        </Container>
      )}
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <OnboardingAlerts />

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!products?.length ? (
                <NotFound>
                  <NotFoundIcon name="video" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "productsNotFound" })}
                  </NotFoundSubtitle>
                  <Button
                    onClick={goToAddProduct}
                    isDisabled={!isCompleteIntegrations}
                  >
                    {translate.formatMessage({ id: "addProduct" })}
                  </Button>
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
    </AppLayout>
  );
};
