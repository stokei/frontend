import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Icon,
  Pagination,
  Select,
  SelectList,
  SelectSearchInput,
  Stack,
} from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import {
  CustomerInvoiceFilter,
  InvoiceFilters,
  StatusInvoiceFilter,
} from "./components/invoice-filters";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import {
  useGetAppInvoicesQuery,
  AppInvoiceFragment,
} from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface InvoicesPageProps {}

export const InvoicesPage: FC<InvoicesPageProps> = () => {
  const [currentCustomer, setCurrentCustomer] = useState<
    CustomerInvoiceFilter | undefined
  >();
  const [currentStatus, setCurrentStatus] = useState<StatusInvoiceFilter>(
    StatusInvoiceFilter.All
  );
  const [invoices, setInvoices] = useState<AppInvoiceFragment[]>([]);

  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  /*
    Verificar porque o filtro por status não está funcionando
  */
  console.log({ currentStatus });
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
          NOT: {
            customer: {
              equals: currentAccount?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    if (!!dataGetInvoices?.invoices?.items?.length) {
      setInvoices(dataGetInvoices?.invoices?.items);
    }
  }, [dataGetInvoices]);

  return (
    <AdminLayout>
      <Navbar />
      <Box width="full" flexDirection="column">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
            <InvoiceFilters
              currentCustomer={currentCustomer}
              onChooseCurrentCustomer={setCurrentCustomer}
              onRemoveChooseCurrentCustomer={() =>
                setCurrentCustomer(undefined)
              }
              currentStatus={currentStatus}
              onChooseCurrentStatus={(status) =>
                setCurrentStatus(status || StatusInvoiceFilter.All)
              }
              onRemoveChooseCurrentStatus={() =>
                setCurrentStatus(StatusInvoiceFilter.All)
              }
            />
            <InvoicesList invoices={invoices} />
            {dataGetInvoices?.invoices?.totalPages &&
              dataGetInvoices?.invoices?.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={!!dataGetInvoices?.invoices?.hasNextPage}
                  hasPreviousPage={!!dataGetInvoices?.invoices?.hasPreviousPage}
                  totalPages={dataGetInvoices?.invoices?.totalPages || 1}
                />
              )}
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
