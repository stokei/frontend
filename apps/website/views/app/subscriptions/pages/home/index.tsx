import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { SubscriptionContractFilters } from "./components/subscription-contract-filters";
import { SubscriptionContractsList } from "./components/subscription-contracts-list";
import {
  AppSubscriptionContractFragment,
  useGetAppSubscriptionContractsQuery,
} from "./graphql/subscription-contracts.query.graphql.generated";
import { Loading } from "./loading";

export const SubscriptionContractsPage = () => {
  const [currentCustomers, setCurrentCustomers] = useState<
    AppAccountFragment[]
  >([]);
  const [currentStatus, setCurrentStatus] =
    useState<SubscriptionContractStatusFilter>(
      SubscriptionContractStatusFilter.All
    );
  const [currentSubscriptionType, setCurrentSubscriptionType] =
    useState<SubscriptionContractTypeFilter>(
      SubscriptionContractTypeFilter.All
    );
  const [subscriptionContracts, setSubscriptionContracts] = useState<
    AppSubscriptionContractFragment[]
  >([]);

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const dataGetSubscriptionContractsWhereOR = useMemo(() => {
    if (!currentCustomers?.length) {
      return [];
    }
    let operatorList: any[] = [];
    if (!!currentCustomers?.length) {
      operatorList = [
        ...operatorList,
        ...currentCustomers?.map((currentCustomer) => ({
          parent: {
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
            parent: {
              startsWith: "acc_",
            },
            app: {
              equals: currentApp?.id,
            },
            ...(currentStatus !== SubscriptionContractStatusFilter.All && {
              status: currentStatus as any,
            }),
            ...(currentSubscriptionType !==
              SubscriptionContractTypeFilter.All && {
              type: currentSubscriptionType as any,
            }),
          },
          OR: dataGetSubscriptionContractsWhereOR,
          NOT: {
            parent: {
              equals: currentAccount?.id,
            },
          },
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

  const onResetCurrentCustomer = () => {
    setCurrentCustomers([]);
    onToggleFiltersDrawer();
  };

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <SubscriptionContractFilters
          isOpen={isOpenFiltersDrawer}
          onClose={onToggleFiltersDrawer}
          currentStatus={currentStatus}
          currentSubscriptionType={currentSubscriptionType}
          currentCustomers={currentCustomers}
          onResetCurrentCustomer={onResetCurrentCustomer}
          onChooseCurrentCustomer={onChooseCurrentCustomer}
          onRemoveChooseCurrentCustomer={onRemoveChooseCurrentCustomer}
          onChooseCurrentStatus={(status) =>
            setCurrentStatus(status || SubscriptionContractStatusFilter.All)
          }
          onRemoveChooseCurrentStatus={() =>
            setCurrentStatus(SubscriptionContractStatusFilter.All)
          }
          onChooseCurrentSubscriptionType={(type) =>
            setCurrentSubscriptionType(
              type || SubscriptionContractTypeFilter.All
            )
          }
          onRemoveChooseCurrentSubscriptionType={() =>
            setCurrentSubscriptionType(SubscriptionContractTypeFilter.All)
          }
        />
        <Container>
          <Header
            onOpenFilters={onToggleFiltersDrawer}
            subscriptionContractTotalCount={
              dataGetSubscriptionContracts?.subscriptionContracts?.totalCount ||
              0
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
                  <SubscriptionContractsList
                    subscriptionContracts={subscriptionContracts}
                  />
                  {dataGetSubscriptionContracts?.subscriptionContracts
                    ?.totalPages &&
                    dataGetSubscriptionContracts?.subscriptionContracts
                      ?.totalPages > 1 && (
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
                </Stack>
              </CardBody>
            </Card>
          </Container>
        )}
      </Stack>
    </AppLayout>
  );
};
