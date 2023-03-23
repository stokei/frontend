import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import { Box, Container, Pagination } from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import {
  useGetAppInvoicesQuery,
  AppInvoiceFragment,
} from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface InvoicesPageProps {}

export const InvoicesPage: FC<InvoicesPageProps> = () => {
  const [invoices, setInvoices] = useState<AppInvoiceFragment[]>([]);

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

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
      <Box width="full" flexDirection="row">
        {isLoading ? (
          <Loading />
        ) : (
          <Container paddingY="5">
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
