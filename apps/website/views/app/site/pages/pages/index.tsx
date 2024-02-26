import {
  useCurrentApp,
  usePagination,
  useSite,
  useTranslations,
} from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { useMemo } from "react";
import { SiteLayout } from "../../layout";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { PagesList } from "./components/pages-list";
import { useGetSitePagesQuery } from "./graphql/pages.query.graphql.generated";
import { Loading } from "./loading";

const SitePagesPage = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { site } = useSite();
  const { currentPage, onChangePage } = usePagination();

  const [{ fetching: isLoading, data: dataPages }] = useGetSitePagesQuery({
    pause: !currentApp?.id || !site?.id,
    requestPolicy: "network-only",
    variables: {
      page: {
        limit: 12,
        number: currentPage,
      },
      where: {
        AND: {
          parent: {
            equals: site?.id,
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

  const pages = useMemo(
    () => dataPages?.pages?.items || [],
    [dataPages?.pages?.items]
  );

  return (
    <Container paddingY="5">
      <Stack direction="column" spacing="5">
        <Header totalCount={dataPages?.pages?.totalCount || 0} />

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!pages?.length ? (
              <NotFound>
                <NotFoundIcon name="site" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "pagesNotFound" })}
                </NotFoundSubtitle>
              </NotFound>
            ) : (
              <PagesList pages={pages} />
            )}
          </>
        )}

        {dataPages?.pages?.totalPages && dataPages?.pages?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onChangePage={onChangePage}
            hasNextPage={!!dataPages?.pages?.hasNextPage}
            hasPreviousPage={!!dataPages?.pages?.hasPreviousPage}
            totalPages={dataPages?.pages?.totalPages || 1}
          />
        )}
      </Stack>
    </Container>
  );
};

const SitePagesWithLayout: FC<SitePagesPageProps> = () => {
  return (
    <SiteLayout>
      <Navbar />
      <SitePagesPage />
    </SiteLayout>
  );
};

export { SitePagesWithLayout as SitePagesPage };
