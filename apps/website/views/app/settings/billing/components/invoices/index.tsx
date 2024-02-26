import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { useSubscriptionPageInvoicesQuery } from "@/views/app/subscription/graphql/invoices.query.graphql.generated";
import { Card, CardBody, Pagination, Stack, Title } from "@stokei/ui";

import { InvoicesList } from "../invoices-list";

export const Invoices = () => {
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();

  const [{ data: dataGetInvoices, fetching: isLoadingInvoices }] =
    useSubscriptionPageInvoicesQuery({
      pause: !currentApp?.currentSubscriptionContract?.id,
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
            subscription: {
              equals: currentApp?.currentSubscriptionContract?.id,
            },
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        <Stack direction="column" spacing="5">
          <Title fontSize="md">
            {translate.formatMessage({ id: "invoices" })}
          </Title>
          <InvoicesList invoices={dataGetInvoices?.invoices?.items || []} />
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
        </Stack>
      </CardBody>
    </Card>
  );
};
