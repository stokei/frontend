import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AdminLayout } from "@/views/admins/layout";
import { Container, Pagination, Stack } from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/navbar";
import { StatusSubscriptionContractFilter } from "./components/select-filter-status";
import { AppAccountFragment } from "./graphql/accounts.query.graphql.generated";
import {
  AppSubscriptionContractFragment,
  useGetAppSubscriptionContractsQuery,
} from "./graphql/invoices.query.graphql.generated";
import { Loading } from "./loading";

interface SubscriptionContractsPageProps {}

export const SubscriptionContractsPage: FC<
  SubscriptionContractsPageProps
> = () => {
  const [currentCustomers, setCurrentCustomers] = useState<
    AppAccountFragment[]
  >([]);
  const [currentStatus, setCurrentStatus] =
    useState<StatusSubscriptionContractFilter>(
      StatusSubscriptionContractFilter.All
    );
  const [subscriptionContracts, setSubscriptionContracts] = useState<
    AppSubscriptionContractFragment[]
  >([]);

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const dataGetSubscriptionContractsWhereOR = useMemo(() => {
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

  const [{ data: dataGetSubscriptionContracts, fetching: isLoading }] =
    useGetAppSubscriptionContractsQuery({
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
            ...(currentStatus !== StatusSubscriptionContractFilter.All && {
              status: currentStatus as any,
            }),
          },
          OR: dataGetSubscriptionContractsWhereOR,
        },
      },
    });

  useEffect(() => {
    setSubscriptionContracts(
      dataGetSubscriptionContracts?.subscriptionContracts?.items || []
    );
  }, [dataGetSubscriptionContracts]);

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
          <SubscriptionContractFilters
            currentStatus={currentStatus}
            currentCustomers={currentCustomers}
            onChooseCurrentCustomer={onChooseCurrentCustomer}
            onRemoveChooseCurrentCustomer={onRemoveChooseCurrentCustomer}
            onChooseCurrentStatus={(status) =>
              setCurrentStatus(status || StatusSubscriptionContractFilter.All)
            }
            onRemoveChooseCurrentStatus={() =>
              setCurrentStatus(StatusSubscriptionContractFilter.All)
            }
          />
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <SubscriptionContractsList
              subscriptionContracts={subscriptionContracts}
            />
            {dataGetSubscriptionContracts?.subscriptionContracts?.totalPages &&
              dataGetSubscriptionContracts?.subscriptionContracts?.totalPages >
                1 && (
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={
                    !!dataGetSubscriptionContracts?.subscriptionContracts
                      ?.hasNextPage
                  }
                  hasPreviousPage={
                    !!dataGetSubscriptionContracts?.subscriptionContracts
                      ?.hasPreviousPage
                  }
                  totalPages={
                    dataGetSubscriptionContracts?.subscriptionContracts
                      ?.totalPages || 1
                  }
                />
              )}
          </Container>
        )}
      </Stack>
    </AdminLayout>
  );
};
