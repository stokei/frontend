import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import {
  Card,
  CardBody,
  Container,
  Pagination,
  Stack,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { InvoicesList } from "./components/invoices-list";
import { Navbar } from "./components/navbar";
import { SubscriptionContractDetails } from "./components/subscription-contract-details";
import { useSubscriptionPageInvoicesQuery } from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface SubscriptionContractPageProps {}

export const SubscriptionContractPage: FC<
  SubscriptionContractPageProps
> = () => {
  const router = useRouter();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const translate = useTranslations();

  const subscriptionContractId = useMemo(
    () => router?.query?.subscriptionContractId?.toString(),
    [router?.query?.subscriptionContractId]
  );

  const [{ data: dataGetInvoices, fetching: isLoading }] =
    useSubscriptionPageInvoicesQuery({
      pause: !currentApp || !subscriptionContractId,
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
              equals: subscriptionContractId,
            },
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  return (
    <AdminLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <SubscriptionContractDetails />
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <Card width="full" background="background.50">
              <CardBody overflow="hidden" alignItems="center">
                <Stack direction="column" spacing="5">
                  <Title fontSize="lg">
                    {translate.formatMessage({ id: "invoices" })}
                  </Title>
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
    </AdminLayout>
  );
};
