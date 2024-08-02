import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { SubscriptionContractStatus } from "@/services/graphql/stokei";
import { CustomerLayout } from "@/views/customers/layout";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { useMemo } from "react";
import {
  AppSubscriptionContractItemsBySubscriptionMaterialProductMaterialFragment,
  useGetAppSubscriptionContractItemsBySubscriptionMaterialsQuery,
} from "./graphql/subscription-contracts.query.graphql.generated";
import { Header } from "./components/header";
import { MaterialsList } from "./components/materials-list";
import { Navbar } from "./components/navbar";
import { Loading } from "./loading";

export const MaterialsHomePage = () => {
  const { currentAccount } = useCurrentAccount();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const translate = useTranslations();

  const [{ data: dataGetMaterials, fetching: isLoadingGetMaterials }] =
    useGetAppSubscriptionContractItemsBySubscriptionMaterialsQuery({
      pause: !currentAccount,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          app: {
            equals: currentApp?.id,
          },
          parent: {
            equals: currentAccount?.id,
          },
          product: {
            startsWith: "material_",
          },
          status: SubscriptionContractStatus.Active,
        },
      },
    });

  const materials = useMemo(() => {
    const items = dataGetMaterials?.subscriptionContractItemsBySubscription?.items
      ?.map(({ product }) => product);
    return (items ||
      []) as AppSubscriptionContractItemsBySubscriptionMaterialProductMaterialFragment[];
  }, [dataGetMaterials?.subscriptionContractItemsBySubscription?.items]);

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {dataGetMaterials?.subscriptionContractItemsBySubscription?.totalCount && (
          <Container>
            <Header
              materialsTotalCount={
                dataGetMaterials?.subscriptionContractItemsBySubscription?.totalCount || 0
              }
            />
          </Container>
        )}

        {isLoadingGetMaterials ? (
          <Loading />
        ) : (
          <>
            <Container>
              {!materials?.length ? (
                <NotFound>
                  <NotFoundIcon name="material" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "materialsNotFound" })}
                  </NotFoundSubtitle>
                </NotFound>
              ) : (
                <MaterialsList materials={materials} />
              )}
            </Container>
            <Container>
              {dataGetMaterials?.subscriptionContractItemsBySubscription?.totalPages &&
                dataGetMaterials?.subscriptionContractItemsBySubscription?.totalPages >
                1 && (
                  <Pagination
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    hasNextPage={
                      !!dataGetMaterials?.subscriptionContractItemsBySubscription
                        ?.hasNextPage
                    }
                    hasPreviousPage={
                      !!dataGetMaterials?.subscriptionContractItemsBySubscription
                        ?.hasPreviousPage
                    }
                    totalPages={
                      dataGetMaterials?.subscriptionContractItemsBySubscription
                        ?.totalPages || 1
                    }
                  />
                )}
            </Container>
          </>
        )}
      </Stack>
    </CustomerLayout>
  );
};
