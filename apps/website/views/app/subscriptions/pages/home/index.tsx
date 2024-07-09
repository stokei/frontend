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
import { useMemo } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { SubscriptionContractFilters } from "./components/subscription-contract-filters";
import { SubscriptionContractsList } from "./components/subscription-contracts-list";
import {
  useGetAppSubscriptionContractsQuery
} from "./graphql/subscription-contracts.query.graphql.generated";
import { useFilters } from "./hooks/use-filters";
import { Loading } from "./loading";

export const SubscriptionContractsPage = () => {
  const filters = useFilters();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const dataGetSubscriptionContractsWhereOR = useMemo(() => {
    if (!filters.customers?.length) {
      return [];
    }
    let operatorList: any[] = [];
    if (!!filters.customers?.length) {
      operatorList = [
        ...operatorList,
        ...filters.customers?.map((customer) => ({
          parent: {
            equals: customer?.id,
          },
        })),
      ];
    }
    return operatorList;
  }, [filters.customers]);

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
            ...(filters.status !== SubscriptionContractStatusFilter.All && {
              status: filters.status as any,
            }),
            ...(filters.type !==
              SubscriptionContractTypeFilter.All && {
              type: filters.type as any,
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

  const subscriptionContracts = useMemo(() => {
    return dataGetSubscriptionContracts?.subscriptionContracts?.items || []
  }, [dataGetSubscriptionContracts]);

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <SubscriptionContractFilters
          isOpen={isOpenFiltersDrawer}
          onClose={onToggleFiltersDrawer}
          currentFilters={filters}
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
