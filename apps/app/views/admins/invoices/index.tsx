import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import { Card, CardBody, Container, Pagination, Stack } from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { InvoiceFilters } from "./components/invoice-filters";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import { StatusInvoiceFilter } from "./components/select-filter-status";
import { AppAccountFragment } from "./graphql/accounts.query.graphql.generated";
import {
  AppInvoiceFragment,
  useGetAppInvoicesQuery,
} from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface InvoicesPageProps {}

export const InvoicesPage: FC<InvoicesPageProps> = () => {
  const [currentCustomers, setCurrentCustomers] = useState<
    AppAccountFragment[]
  >([]);
  const [currentStatus, setCurrentStatus] = useState<StatusInvoiceFilter>(
    StatusInvoiceFilter.All
  );
  const [invoices, setInvoices] = useState<AppInvoiceFragment[]>([]);

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
            ...(currentStatus !== StatusInvoiceFilter.All && {
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

  useEffect(() => {
    setInvoices(dataGetInvoices?.invoices?.items || []);
  }, [dataGetInvoices]);

  const onChooseCurrentCustomer = useCallback(
    (customer?: AppAccountFragment) => {
      if (customer) {
        setCurrentCustomers((customers) => [...customers, customer]);
      }
    },
    []
  );
  const onRemoveChooseCurrentCustomer = useCallback(
    (customerRemoved?: AppAccountFragment) => {
      if (customerRemoved) {
        setCurrentCustomers((customers) =>
          customers?.filter((customer) => customer?.id !== customerRemoved?.id)
        );
      }
    },
    []
  );

  return (
    <AdminLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <InvoiceFilters
            currentStatus={currentStatus}
            currentCustomers={currentCustomers}
            onChooseCurrentCustomer={onChooseCurrentCustomer}
            onRemoveChooseCurrentCustomer={onRemoveChooseCurrentCustomer}
            onChooseCurrentStatus={(status) =>
              setCurrentStatus(status || StatusInvoiceFilter.All)
            }
            onRemoveChooseCurrentStatus={() =>
              setCurrentStatus(StatusInvoiceFilter.All)
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
                  <InvoicesList invoices={invoices} />
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
    </AdminLayout>
  );
};
