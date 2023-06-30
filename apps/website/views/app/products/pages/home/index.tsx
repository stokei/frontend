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
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
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
  const [products, setProducts] = useState<AdminProductPageProductFragment[]>(
    []
  );
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();

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

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          {products?.length >= 1 && (
            <Box width="full">
              <Button onClick={goToAddProduct}>
                {translate.formatMessage({ id: "addProduct" })}
              </Button>
            </Box>
          )}

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
                  <Button onClick={goToAddProduct}>
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
