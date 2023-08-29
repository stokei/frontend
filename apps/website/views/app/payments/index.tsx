import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useCurrentApp, usePagination } from "@/hooks";
import { PaymentStatusFilter } from "@/interfaces/payment-status-filter";
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
import { PaymentFilters } from "./components/payments-filters";
import { PaymentsList } from "./components/payments-list";
import { useGetAppPaymentsQuery } from "./graphql/payments.query.graphql.generated";
import { Loading } from "./loading";

interface PaymentsPageProps {}

export const PaymentsPage: FC<PaymentsPageProps> = () => {
  const [customers, setPayers] = useState<AppAccountFragment[]>([]);
  const [status, setStatus] = useState<PaymentStatusFilter>(
    PaymentStatusFilter.All
  );

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const {
    isOpen: isOpenFiltersDrawer,
    onClose: onCloseFiltersDrawer,
    onOpen: onOpenFiltersDrawer,
  } = useDisclosure();

  const dataGetPaymentsWhereOR = useMemo(() => {
    if (!customers?.length) {
      return [];
    }
    let operatorList: any[] = [];
    if (!!customers?.length) {
      operatorList = [
        ...operatorList,
        ...customers?.map((currentPayer) => ({
          payer: {
            equals: currentPayer?.id,
          },
        })),
      ];
    }
    return operatorList;
  }, [customers]);

  const [{ data: dataGetPayments, fetching: isLoading }] =
    useGetAppPaymentsQuery({
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
            ...(status !== PaymentStatusFilter.All && {
              status: status as any,
            }),
          },
          OR: dataGetPaymentsWhereOR,
        },
      },
    });

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <PaymentFilters
          currentStatus={status}
          currentPayers={customers}
          isOpen={isOpenFiltersDrawer}
          onChooseCurrentStatus={setStatus}
          onChooseCurrentPayers={setPayers}
          onRemoveCurrentStatus={() => setStatus(PaymentStatusFilter.All)}
          onRemoveCurrentPayers={() => setPayers([])}
          onClose={onCloseFiltersDrawer}
        />
        <Stack direction="column" spacing="5">
          <Header
            totalCount={dataGetPayments?.payments?.totalCount || 0}
            onOpenFilters={onOpenFiltersDrawer}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <Card width="full" background="background.50">
              <CardBody overflow="hidden" alignItems="center">
                <Stack direction="column" spacing="5">
                  <PaymentsList
                    payments={dataGetPayments?.payments?.items || []}
                  />
                  {dataGetPayments?.payments?.totalPages &&
                    dataGetPayments?.payments?.totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        hasNextPage={!!dataGetPayments?.payments?.hasNextPage}
                        hasPreviousPage={
                          !!dataGetPayments?.payments?.hasPreviousPage
                        }
                        totalPages={dataGetPayments?.payments?.totalPages || 1}
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
