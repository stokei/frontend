import { useCurrentApp, usePagination } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { OrderBy } from "@/services/graphql/stokei";
import { CustomerLayout } from "@/views/customers/layout";
import { Card, CardBody, Container, Pagination, Stack } from "@stokei/ui";
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { SubscriptionContractFilters } from "./components/subscription-contract-filters";
import { SubscriptionContractsList } from "./components/subscription-contracts-list";
import {
  AppSubscriptionContractFragment,
  useGetAppSubscriptionContractsQuery,
} from "./graphql/subscription-contracts.query.graphql.generated";
import { Loading } from "./loading";

export const SubscriptionContractsPage = () => {
  const [currentStatus, setCurrentStatus] =
    useState<SubscriptionContractStatusFilter>(
      SubscriptionContractStatusFilter.All
    );
  const [subscriptionContracts, setSubscriptionContracts] = useState<
    AppSubscriptionContractFragment[]
  >([]);

  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();
  const { currentAccount } = useCurrentAccount();

  const [{ data: dataGetSubscriptionContracts, fetching: isLoading }] =
    useGetAppSubscriptionContractsQuery({
      requestPolicy: "network-only",
      pause: !currentApp && !currentAccount,
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
              equals: currentAccount?.id,
            },
            app: {
              equals: currentApp?.id,
            },
            ...(currentStatus !== SubscriptionContractStatusFilter.All && {
              status: currentStatus as any,
            }),
          },
        },
      },
    });

  useEffect(() => {
    setSubscriptionContracts(
      dataGetSubscriptionContracts?.subscriptionContracts?.items || []
    );
  }, [dataGetSubscriptionContracts]);

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>
          <SubscriptionContractFilters
            currentStatus={currentStatus}
            onChooseCurrentStatus={(status) =>
              setCurrentStatus(status || SubscriptionContractStatusFilter.All)
            }
            onRemoveChooseCurrentStatus={() =>
              setCurrentStatus(SubscriptionContractStatusFilter.All)
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
    </CustomerLayout>
  );
};
