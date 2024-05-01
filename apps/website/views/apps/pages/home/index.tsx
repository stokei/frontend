import { usePagination, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { websiteRoutes } from "@stokei/routes";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppsList } from "./components/apps-list";
import { Navbar } from "./components/navbar";
import {
  AdminAppPageAppFragment,
  useGetAdminAppPageAppsQuery,
} from "./graphql/apps.query.graphql.generated";
import { Loading } from "./loading";

export const AppsPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const [apps, setApps] = useState<AdminAppPageAppFragment[]>([]);
  const { currentAccount } = useCurrentAccount();
  const { currentPage, onChangePage } = usePagination();

  const [{ fetching: isLoading, data: dataApps }] = useGetAdminAppPageAppsQuery(
    {
      pause: !currentAccount,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: currentAccount?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Asc,
        },
      },
    }
  );

  useEffect(() => {
    setApps(dataApps?.apps?.items || []);
  }, [dataApps]);

  const goToAddApp = () => {
    router.push(websiteRoutes.apps.add);
  };

  return (
    <>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          {apps?.length >= 1 && (
            <Box width="full">
              <Button onClick={goToAddApp}>
                {translate.formatMessage({ id: "addApp" })}
              </Button>
            </Box>
          )}

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!apps?.length ? (
                <NotFound>
                  <NotFoundIcon name="video" />
                  <NotFoundSubtitle>
                    {translate.formatMessage({ id: "appsNotFound" })}
                  </NotFoundSubtitle>
                  <Button onClick={goToAddApp}>
                    {translate.formatMessage({ id: "addApp" })}
                  </Button>
                </NotFound>
              ) : (
                <AppsList apps={apps} />
              )}
            </>
          )}

          {dataApps?.apps?.totalPages && dataApps?.apps?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
              hasNextPage={!!dataApps?.apps?.hasNextPage}
              hasPreviousPage={!!dataApps?.apps?.hasPreviousPage}
              totalPages={dataApps?.apps?.totalPages || 1}
            />
          )}
        </Stack>
      </Container>
    </>
  );
};
