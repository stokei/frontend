import { Container, NotFound, NotFoundIcon, NotFoundSubtitle, Pagination, Stack, useDisclosure } from "@stokei/ui";

import { SiteLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { Header } from "./components/header";
import { PagesList } from "./components/pages-list";
import { AddPageDrawer } from "./components/add-page-drawer";
import { usePagination, useSite, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { useGetSitePagesQuery } from "./graphql/pages.query.graphql.generated";
import { useMemo } from "react";

const SitePages = () => {
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const {
    isOpen: isOpenAddPageDrawer,
    onClose: onCloseAddPageDrawer,
    onOpen: onOpenAddPageDrawer,
  } = useDisclosure();

  const { siteId } = useSite();
  const [{ data: dataGetPages }, onReloadPages] = useGetSitePagesQuery({
    pause: !siteId,
    variables: {
      page: {
        limit: 10,
        number: currentPage,
      },
      orderBy: {
        title: OrderBy.Asc,
      },
      where: {
        AND: {
          parent: {
            equals: siteId,
          },
        },
      },
    },
  });
  const pages = useMemo(
    () => dataGetPages?.pages?.items || [],
    [dataGetPages?.pages?.items]
  );

  return (
    <Container paddingY="5">
      <AddPageDrawer
        isOpenDrawer={isOpenAddPageDrawer}
        onCloseDrawer={onCloseAddPageDrawer}
        onSuccess={() => onReloadPages({ requestPolicy: 'network-only' })}
      />
      <Stack direction="column" spacing="5">
        <Header
          totalCount={dataGetPages?.pages?.totalCount || 0}
          onAddPage={onOpenAddPageDrawer}
        />
        {!pages?.length ? (
          <NotFound>
            <NotFoundIcon name="page" />
            <NotFoundSubtitle>
              {translate.formatMessage({ id: "pagesNotFound" })}
            </NotFoundSubtitle>
          </NotFound>
        ) : (
          <PagesList pages={pages} />
        )}
        {dataGetPages?.pages?.totalPages &&
          dataGetPages?.pages?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
              hasNextPage={!!dataGetPages?.pages?.hasNextPage}
              hasPreviousPage={!!dataGetPages?.pages?.hasPreviousPage}
              totalPages={dataGetPages?.pages?.totalPages || 1}
            />
          )}
      </Stack>
    </Container>
  );
};

const SitePagesWithLayout = () => {
  return (
    <SiteLayout>
      <Navbar />
      <SitePages />
    </SiteLayout>
  );
};

export { SitePagesWithLayout as SitePages };
