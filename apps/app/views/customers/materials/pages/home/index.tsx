import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { OrderBy } from "@/services/graphql/stokei";
import { CustomerLayout } from "@/views/customers/layout";
import {
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Header } from "./components/header";
import { MaterialsList } from "./components/materials-list";
import { Navbar } from "./components/navbar";
import {
  SubscriptionContractItemProductMaterialFragment,
  useGetAppSubscriptionContractItemsMaterialsQuery,
} from "./graphql/subscription-contracts.query.graphql.generated";
import { Loading } from "./loading";

interface MaterialsHomePageProps {}

export const MaterialsHomePage: FC<MaterialsHomePageProps> = () => {
  const router = useRouter();
  const { currentAccount } = useCurrentAccount();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const translate = useTranslations();

  const [{ data: dataGetMaterials, fetching: isLoadingGetMaterials }] =
    useGetAppSubscriptionContractItemsMaterialsQuery({
      pause: !currentAccount,
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
              equals: currentAccount?.id,
            },
            product: {
              startsWith: "material_",
            },
          },
        },
      },
    });

  const materials = useMemo(
    () =>
      dataGetMaterials?.subscriptionContractItems?.items
        ?.map((item) =>
          item.product?.__typename === "Material" ? item.product : undefined
        )
        .filter(Boolean) ||
      ([] as SubscriptionContractItemProductMaterialFragment[]),
    [dataGetMaterials?.subscriptionContractItems?.items]
  );

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {dataGetMaterials?.subscriptionContractItems?.totalCount && (
          <Container>
            <Header
              materialsTotalCount={
                dataGetMaterials?.subscriptionContractItems?.totalCount || 0
              }
            />
          </Container>
        )}

        {isLoadingGetMaterials ? (
          <Loading />
        ) : (
          <Container>
            <>
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
            </>
            {dataGetMaterials?.subscriptionContractItems?.totalPages &&
              dataGetMaterials?.subscriptionContractItems?.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={
                    !!dataGetMaterials?.subscriptionContractItems?.hasNextPage
                  }
                  hasPreviousPage={
                    !!dataGetMaterials?.subscriptionContractItems
                      ?.hasPreviousPage
                  }
                  totalPages={
                    dataGetMaterials?.subscriptionContractItems?.totalPages || 1
                  }
                />
              )}
          </Container>
        )}
      </Stack>
    </CustomerLayout>
  );
};
