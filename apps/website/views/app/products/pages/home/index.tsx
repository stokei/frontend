import { OnboardingAlerts } from "@/components/onboarding-alerts";
import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { ProductFilters } from "./components/product-filters";
import { ProductsList } from "./components/products-list";
import { Navbar } from "./components/navbar";
import {
  useGetAdminProductPageProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { Loading } from "./loading";
import { ProductType } from "@/constants/product-type";
import { ProductType as ProductTypeAPI } from "@/services/graphql/stokei";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

export const ProductsPage = () => {
  const translate = useTranslations();
  const [currentProductType, setCurrentProductType] = useState<ProductType>(
    ProductType.ALL
  );
  const [filteredProductQuery, setFilteredProductQuery] = useState<string>();
  const [products, setProducts] = useState<GeneralProductFragment[]>(
    []
  );
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const [{ fetching: isLoading, data: dataProducts }] =
    useGetAdminProductPageProductsQuery({
      pause: !currentApp,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 12,
          number: currentPage,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            ...(currentProductType !== ProductType.ALL && currentProductType !== ProductType.COMBO && {
              parent: {
                startsWith: currentProductType,
              },
            }),
            ...(currentProductType === ProductType.COMBO && ({
              type: ProductTypeAPI.Combo
            })),
            ...(filteredProductQuery && {
              name: {
                startsWith: filteredProductQuery,
              },
            }),
          },
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
      },
    });

  useEffect(() => {
    setProducts(dataProducts?.products?.items || []);
  }, [dataProducts]);

  return (
    <AppLayout>
      <Navbar />
      <ProductFilters
        isOpen={isOpenFiltersDrawer}
        onClose={onToggleFiltersDrawer}
        currentProductType={currentProductType}
        onChangeCurrentProductType={setCurrentProductType}
        filteredProductQuery={filteredProductQuery}
        onChangeFilteredProductQuery={setFilteredProductQuery}
      />

      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <OnboardingAlerts />
          <Header
            productsTotalCount={dataProducts?.products?.totalCount || 0}
            onOpenFilters={onToggleFiltersDrawer}
          />

          {isLoading ? (
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
    </AppLayout>
  );
};
