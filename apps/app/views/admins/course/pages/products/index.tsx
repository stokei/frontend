import { usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
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
import { FC, useEffect, useMemo, useState } from "react";
import { CourseLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { ProductsList } from "./components/products-list";
import {
  AdminCoursePageProductFragment,
  useGetAdminCoursePageProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { Loading } from "./loading";

interface CourseProductsPageProps {}

export const CourseProductsPage: FC<CourseProductsPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const [products, setProducts] = useState<AdminCoursePageProductFragment[]>(
    []
  );
  const { currentPage, onChangePage } = usePagination();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ fetching: isLoading, data: dataProducts }] =
    useGetAdminCoursePageProductsQuery({
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: courseId,
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
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          {products?.length >= 1 && (
            <Box width="full">
              <Button onClick={() => {}}>
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
                  <Button onClick={() => {}}>
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
    </CourseLayout>
  );
};
