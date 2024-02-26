import { OnboardingAlerts } from "@/components/onboarding-alerts";
import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useMemo, useState } from "react";
import { AddCatalogDrawer } from "./components/add-catalog-drawer";
import { CatalogFilters } from "./components/catalog-filters";
import { CatalogsList } from "./components/catalogs-list";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { useGetAdminCatalogsPageCatalogsQuery } from "./graphql/catalogs.query.graphql.generated";
import { Loading } from "./loading";

export const CatalogsPage = () => {
  const [filteredCatalogQuery, setFilteredCatalogQuery] = useState<string>();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const {
    isOpen: isOpenAddCatalogDrawer,
    onClose: onCloseAddCatalogDrawer,
    onOpen: onOpenAddCatalogDrawer,
  } = useDisclosure();

  const [{ fetching: isLoading, data: dataCatalogs }] =
    useGetAdminCatalogsPageCatalogsQuery({
      pause: !currentApp,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
      },
    });

  const catalogs = useMemo(
    () => dataCatalogs?.catalogs?.items || [],
    [dataCatalogs]
  );

  return (
    <AppLayout>
      <Navbar />
      <CatalogFilters
        isOpen={isOpenFiltersDrawer}
        onClose={onToggleFiltersDrawer}
        filteredCatalogQuery={filteredCatalogQuery}
        onChangeFilteredCatalogQuery={setFilteredCatalogQuery}
      />

      <AddCatalogDrawer
        isOpenDrawer={isOpenAddCatalogDrawer}
        onCloseDrawer={onCloseAddCatalogDrawer}
      />

      <Container paddingTop="5">
        <Header
          onOpenFilters={onToggleFiltersDrawer}
          onAddCatalog={onOpenAddCatalogDrawer}
          catalogsTotalCount={dataCatalogs?.catalogs?.totalCount || 0}
        />
      </Container>

      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <OnboardingAlerts />

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!catalogs?.length ? (
                <NotFound>
                  <NotFoundIcon name="product" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "catalogsNotFound" })}
                  </NotFoundSubtitle>
                </NotFound>
              ) : (
                <CatalogsList catalogs={catalogs} />
              )}
            </>
          )}

          {dataCatalogs?.catalogs?.totalPages &&
            dataCatalogs?.catalogs?.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
                hasNextPage={!!dataCatalogs?.catalogs?.hasNextPage}
                hasPreviousPage={!!dataCatalogs?.catalogs?.hasPreviousPage}
                totalPages={dataCatalogs?.catalogs?.totalPages || 1}
              />
            )}
        </Stack>
      </Container>
    </AppLayout>
  );
};
