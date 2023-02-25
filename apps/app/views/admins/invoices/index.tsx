import { useCurrentApp } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import { Box, Container } from "@stokei/ui";
import { FC, useEffect, useState } from "react";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import { AppInvoiceFragment } from "./graphql/invoice.fragment.graphql.generated";
import { useGetAppInvoicesQuery } from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface InvoicesPageProps {}

export const InvoicesPage: FC<InvoicesPageProps> = () => {
  const [invoices, setInvoices] = useState<AppInvoiceFragment[]>([]);

  const { currentApp } = useCurrentApp();

  const [{ data: dataGetInvoices, fetching: isLoading }] =
    useGetAppInvoicesQuery({
      pause: !currentApp,
      variables: {
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
              equals: currentApp?.id,
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
          </Container>
        )}
      </Box>
    </AdminLayout>
  );
};
