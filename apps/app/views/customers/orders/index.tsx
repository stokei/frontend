import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { CustomerLayout } from "@/views/customers/layout";
import { Card, CardBody, Container, Pagination, Stack } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";
import { OrdersList } from "./components/orders-list";
import { useGetAppOrdersQuery } from "./graphql/orders.query.graphql.generated";
import { Loading } from "./loading";

interface OrdersPageProps {}

export const OrdersPage: FC<OrdersPageProps> = () => {
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const [{ data: dataGetOrders, fetching: isLoading }] = useGetAppOrdersQuery({
    pause: !currentApp,
    variables: {
      page: {
        limit: 10,
        number: currentPage,
      },
      orderBy: {
        createdAt: OrderBy.Desc,
      },
      where: {
        AND: {
          parent: {
            equals: currentAccount?.id,
          },
          app: {
            equals: currentApp?.id,
          },
        },
      },
    },
  });

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <Card width="full" background="background.50">
              <CardBody overflow="hidden" alignItems="center">
                <Stack direction="column" spacing="5">
                  <OrdersList orders={dataGetOrders?.orders?.items || []} />
                  {dataGetOrders?.orders?.totalPages &&
                    dataGetOrders?.orders?.totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        hasNextPage={!!dataGetOrders?.orders?.hasNextPage}
                        hasPreviousPage={
                          !!dataGetOrders?.orders?.hasPreviousPage
                        }
                        totalPages={dataGetOrders?.orders?.totalPages || 1}
                      />
                    )}
                </Stack>
              </CardBody>
            </Card>
          </Container>
        )}
      </Stack>
    </CustomerLayout>
  );
};
