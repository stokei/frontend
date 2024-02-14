import { OnboardingAlerts } from "@/components/onboarding-alerts";
import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { SitesList } from "./components/sites-list";
import { useGetSitesHomePageSitesQuery } from "./graphql/sites.query.graphql.generated";
import { Loading } from "./loading";

interface SitesPageProps {}

export const SitesPage: FC<SitesPageProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();

  const [{ fetching: isLoading, data: dataSites }] =
    useGetSitesHomePageSitesQuery({
      pause: !currentApp?.id,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 12,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
            app: {
              equals: currentApp?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
      },
    });

  const sites = useMemo(
    () => dataSites?.sites?.items || [],
    [dataSites?.sites?.items]
  );

  return (
    <AppLayout>
      <Navbar />

      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <OnboardingAlerts />
          <Header totalCount={dataSites?.sites?.totalCount || 0} />

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!sites?.length ? (
                <NotFound>
                  <NotFoundIcon name="site" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "sitesNotFound" })}
                  </NotFoundSubtitle>
                </NotFound>
              ) : (
                <SitesList sites={sites} />
              )}
            </>
          )}

          {dataSites?.sites?.totalPages && dataSites?.sites?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
              hasNextPage={!!dataSites?.sites?.hasNextPage}
              hasPreviousPage={!!dataSites?.sites?.hasPreviousPage}
              totalPages={dataSites?.sites?.totalPages || 1}
            />
          )}
        </Stack>
      </Container>
    </AppLayout>
  );
};
