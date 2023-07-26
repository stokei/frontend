import { usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CourseLayout } from "../../layout";
import { Header } from "./components/header";
import { MaterialsList } from "./components/materials-list";
import { Navbar } from "./components/navbar";
import { useGetCourseMaterialsQuery } from "./graphql/materials.query.graphql.generated";
import { Loading } from "./loading";

interface MaterialsHomePageProps {}

export const MaterialsHomePage: FC<MaterialsHomePageProps> = () => {
  const router = useRouter();
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
