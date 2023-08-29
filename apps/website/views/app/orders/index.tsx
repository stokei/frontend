import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useCurrentApp, usePagination } from "@/hooks";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Card,
  CardBody,
  Container,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { FC, useMemo, useState } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { OrderFilters } from "./components/orders-filters";
import { OrdersList } from "./components/orders-list";
import { useGetAppOrdersQuery } from "./graphql/orders.query.graphql.generated";
import { Loading } from "./loading";

interface OrdersPageProps {}

export const OrdersPage: FC<OrdersPageProps> = () => {
  const [customers, setCustomers] = useState<AppAccountFragment[]>([]);
  const [status, setStatus] = useState<OrderStatusFilter>(
    OrderStatusFilter.All
  );

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenFiltersDrawer,
    onClose: onCloseFiltersDrawer,
    onOpen: onOpenFiltersDrawer,
  } = useDisclosure();

  const dataGetOrdersWhereOR = useMemo(() => {
    if (!customers?.length) {
      return [];
    }
    let operatorList: any[] = [];
    if (!!customers?.length) {
      operatorList = [
        ...operatorList,
        ...customers?.map((currentCustomer) => ({
          parent: {
            equals: currentCustomer?.id,
          },
        })),
      ];
    }
    return operatorList;
  }, [customers]);

  const [{ data: dataGetOrders, fetching: isLoading }] = useGetAppOrdersQuery({
    pause: !currentApp,
    requestPolicy: "network-only",
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
          app: {
            equals: currentApp?.id,
          },
          ...(status !== OrderStatusFilter.All && {
            status: status as any,
          }),
        },
        OR: dataGetOrdersWhereOR,
      },
    },
  });

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <OrderFilters
          currentStatus={status}
          currentCustomers={customers}
          isOpen={isOpenFiltersDrawer}
          onChooseCurrentStatus={setStatus}
          onChooseCurrentCustomers={setCustomers}
          onRemoveCurrentStatus={() => setStatus(OrderStatusFilter.All)}
          onRemoveCurrentCustomers={() => setCustomers([])}
          onClose={onCloseFiltersDrawer}
        />
        <Stack direction="column" spacing="5">
          <Header
            totalCount={dataGetOrders?.orders?.totalCount || 0}
            onOpenFilters={onOpenFiltersDrawer}
          />
          {isLoading ? (
            <Loading />
          ) : (
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
          )}
        </Stack>
      </Container>
    </AppLayout>
  );
};
