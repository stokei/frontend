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
  AppSubscriptionContractsByItemMaterialProductMaterialFragment,
  useGetAppSubscriptionContractsByItemMaterialsQuery,
} from "../../graphql/subscription-contracts.query.graphql.generated";
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
    useGetAppSubscriptionContractsByItemMaterialsQuery({
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
    const items = dataGetMaterials?.subscriptionContractsByItem?.items
      ?.map((item) => {
        const subscriptionContractItem = item?.items?.items?.[0];
        return subscriptionContractItem?.product?.__typename === "Material"
          ? subscriptionContractItem.product
          : undefined;
      })
      .filter(Boolean);
    return (items ||
      []) as AppSubscriptionContractsByItemMaterialProductMaterialFragment[];
  }, [dataGetMaterials?.subscriptionContractsByItem?.items]);

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {dataGetMaterials?.subscriptionContractsByItem?.totalCount && (
          <Container>
            <Header
              materialsTotalCount={
                dataGetMaterials?.subscriptionContractsByItem?.totalCount || 0
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
              {dataGetMaterials?.subscriptionContractsByItem?.totalPages &&
                dataGetMaterials?.subscriptionContractsByItem?.totalPages >
                  1 && (
                  <Pagination
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    hasNextPage={
                      !!dataGetMaterials?.subscriptionContractsByItem
                        ?.hasNextPage
                    }
                    hasPreviousPage={
                      !!dataGetMaterials?.subscriptionContractsByItem
                        ?.hasPreviousPage
                    }
                    totalPages={
                      dataGetMaterials?.subscriptionContractsByItem
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
