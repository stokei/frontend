import { useCustomersCourse, usePagination, useTranslations } from "@/hooks";
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
import { Navbar } from "../../components/navbar";
import { CourseLayout } from "../../layout";
import { ModuleLoading } from "./components/module-loading";
import { ModulesList } from "./components/modules-list";
import { useGetCustomersCoursePageModulesQuery } from "./graphql/modules.query.graphql.generated";

const CourseModulesPage = () => {
  const { course } = useCustomersCourse();
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();

  const [{ fetching: isLoading, data: dataModules }] =
    useGetCustomersCoursePageModulesQuery({
      pause: !course,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: course?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Asc,
        },
      },
    });

  const modules = useMemo(
    () => dataModules?.modules?.items || [],
    [dataModules]
  );

  return (
    <Container paddingY="5">
      <Stack direction="column" spacing="5">
        {isLoading ? (
          <ModuleLoading />
        ) : (
          <>
            {!modules?.length ? (
              <NotFound>
                <NotFoundIcon name="video" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "modulesNotFound" })}
                </NotFoundSubtitle>
              </NotFound>
            ) : (
              <ModulesList modules={modules} />
            )}
          </>
        )}

        {dataModules?.modules?.totalPages &&
          dataModules?.modules?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
              hasNextPage={!!dataModules?.modules?.hasNextPage}
              hasPreviousPage={!!dataModules?.modules?.hasPreviousPage}
              totalPages={dataModules?.modules?.totalPages || 1}
            />
          )}
      </Stack>
    </Container>
  );
};

const CourseModulesPageWithLayout = () => (
  <CourseLayout>
    <Navbar />
    <CourseModulesPage />
  </CourseLayout>
);

export { CourseModulesPageWithLayout as CourseModulesPage };
