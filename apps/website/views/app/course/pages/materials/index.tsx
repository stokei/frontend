import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { OrderBy } from "@/services/graphql/stokei";
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
import { useMemo } from "react";
import { CourseLayout } from "../../layout";
import { Header } from "./components/header";
import { MaterialsList } from "./components/materials-list";
import { Navbar } from "./components/navbar";
import { useGetCourseMaterialsQuery } from "./graphql/materials.query.graphql.generated";
import { Loading } from "./loading";

export const MaterialsHomePage = () => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const { currentPage, onChangePage } = usePagination();
  const translate = useTranslations();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ data: dataGetMaterials, fetching: isLoadingGetMaterials }] =
    useGetCourseMaterialsQuery({
      pause: !courseId,
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
              equals: courseId,
            },
          },
        },
      },
    });

  const materials = useMemo(
    () => dataGetMaterials?.materials?.items || [],
    [dataGetMaterials?.materials?.items]
  );

  const goToAddMaterial = () =>
    router.push(
      websiteRoutes.app({ appId: currentApp?.id }).course({ course: courseId })
        .materials.add
    );

  return (
    <CourseLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {dataGetMaterials?.materials?.totalCount && (
          <Container>
            <Header
              materialsTotalCount={dataGetMaterials?.materials?.totalCount || 0}
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
                  <Button onClick={goToAddMaterial}>
                    {translate.formatMessage({ id: "addMaterial" })}
                  </Button>
                </NotFound>
              ) : (
                <MaterialsList materials={materials} />
              )}
            </Container>
            <Container>
              {dataGetMaterials?.materials?.totalPages &&
                dataGetMaterials?.materials?.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    hasNextPage={!!dataGetMaterials?.materials?.hasNextPage}
                    hasPreviousPage={
                      !!dataGetMaterials?.materials?.hasPreviousPage
                    }
                    totalPages={dataGetMaterials?.materials?.totalPages || 1}
                  />
                )}
            </Container>
          </>
        )}
      </Stack>
    </CourseLayout>
  );
};
