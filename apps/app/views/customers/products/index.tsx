import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { CustomerLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { ProductsList } from "./components/products-list";
import {
  CustomersProductsPageProductFragment,
  useGetCustomersProductsPageProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { Loading } from "./loading";

interface ProductsPageProps {}

export const ProductsPage: FC<ProductsPageProps> = () => {
  const translate = useTranslations();
  const [products, setProducts] = useState<
    CustomersProductsPageProductFragment[]
  >([]);
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();

  const [{ fetching: isLoading, data: dataProducts }] =
    useGetCustomersProductsPageProductsQuery({
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

  return (
    <CustomerLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
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
    </CustomerLayout>
  );
};