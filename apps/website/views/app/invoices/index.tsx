import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import { Card, CardBody, Container, Pagination, Stack } from "@stokei/ui";
import { addOrRemoveItemFromArray } from "@stokei/utils";
import { useCallback, useMemo, useState } from "react";
import { InvoiceFilters } from "./components/invoice-filters";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import { useGetAppInvoicesQuery } from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

export const InvoicesPage = () => {
  const [currentCustomers, setCurrentCustomers] = useState<
    AppAccountFragment[]
  >([]);
  const [currentStatus, setCurrentStatus] = useState<InvoiceStatusFilter>(
    InvoiceStatusFilter.All
  );

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const dataGetInvoicesWhereOR = useMemo(() => {
    if (!currentCustomers?.length) {
      return [];
    }
    let operatorList: any[] = [];
    if (!!currentCustomers?.length) {
      operatorList = [
        ...operatorList,
        ...currentCustomers?.map((currentCustomer) => ({
          customer: {
            equals: currentCustomer?.id,
          },
        })),
      ];
    }
    return operatorList;
  }, [currentCustomers]);

  const [{ data: dataGetInvoices, fetching: isLoading }] =
    useGetAppInvoicesQuery({
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
            app: {
              equals: currentApp?.id,
            },
            ...(currentStatus !== InvoiceStatusFilter.All && {
              status: currentStatus as any,
            }),
          },
          OR: dataGetInvoicesWhereOR,
          NOT: {
            customer: {
              equals: currentAccount?.id,
            },
          },
        },
      },
    });

  const onChangeCustomer = useCallback(
    (customer?: AppAccountFragment) => {
      if (customer) {
        setCurrentCustomers((customers) => addOrRemoveItemFromArray(customers, customer, 'id'));
      }
    },
    []
  );

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <InvoiceFilters
            currentStatus={currentStatus}
            currentCustomers={currentCustomers}
            onChangeCustomer={onChangeCustomer}
            onChangeStatus={(status) =>
              setCurrentStatus(status || InvoiceStatusFilter.All)
            }
          />
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <Card width="full" background="background.50">
              <CardBody overflow="hidden" alignItems="center">
                <Stack direction="column" spacing="5">
                  <InvoicesList
                    invoices={dataGetInvoices?.invoices?.items || []}
                  />
                  {dataGetInvoices?.invoices?.totalPages &&
                    dataGetInvoices?.invoices?.totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        hasNextPage={!!dataGetInvoices?.invoices?.hasNextPage}
                        hasPreviousPage={
                          !!dataGetInvoices?.invoices?.hasPreviousPage
                        }
                        totalPages={dataGetInvoices?.invoices?.totalPages || 1}
                      />
                    )}
                </Stack>
              </CardBody>
            </Card>
          </Container>
        )}
      </Stack>
    </AppLayout>
  );
};
