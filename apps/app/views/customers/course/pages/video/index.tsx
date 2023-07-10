import { useCustomersCourse, usePagination, useTranslations } from "@/hooks";
import noImage from "@/assets/no-image.png";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Description,
  Image,
  Markdown,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  Title,
  VideoPlayer,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "../../components/navbar";
import { CourseLayout } from "../../layout";
import { ModuleLoading } from "./components/module-loading";
import { ModulesList } from "./components/modules-list";
import { useGetCustomersCoursePageVideoModulesQuery } from "./graphql/modules.query.graphql.generated";
import { useGetCustomersCoursePageVideoQuery } from "./graphql/video.query.graphql.generated";

interface CourseVideoPageProps {}

const CourseVideoPage: FC<CourseVideoPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { course } = useCustomersCourse();
  const { currentPage, onChangePage } = usePagination();

  const videoId = useMemo(() => router?.query?.videoId?.toString(), [router]);
  const [{ fetching: isLoadingGetVideo, data: dataGetVideo }] =
    useGetCustomersCoursePageVideoQuery({
      pause: !videoId,
      variables: {
        videoId: videoId || "",
      },
    });

  const [{ fetching: isLoadingModules, data: dataModules }] =
    useGetCustomersCoursePageVideoModulesQuery({
      pause: !course,
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

  const video = useMemo(() => dataGetVideo?.video, [dataGetVideo]);

  const activeModuleIndex = useMemo(() => {
    const moduleActiveIndex = modules?.findIndex(
      (module) =>
        !!module.videos?.items?.find(
          (moduleVideo) => moduleVideo?.id === video?.id
        )
    );
    return moduleActiveIndex || 0;
  }, [modules, video]);

  return (
    <Container paddingY="5">
      <Stack direction={["column", "column", "row", "row"]} spacing="5">
        <Box flex="2">
          <Card background="background.50" overflow="hidden">
            <CardHeader padding="0">
              {video?.file ? (
                <VideoPlayer
                  id="video"
                  src={video?.file?.url || ""}
                  roundedBottom="none"
                />
              ) : (
                <Image
                  width="full"
                  src={video?.poster?.file?.url || ""}
                  fallbackSrc={noImage.src}
                  alt={video?.name}
                />
              )}
            </CardHeader>
            <CardBody>
              <Stack direction="column" spacing="2">
                <Title fontSize="lg">{video?.name}</Title>
                <Box>
                  {!!course?.instructors?.items?.length && (
                    <Description>
                      {course?.instructors?.items
                        ?.map((instructor) => instructor.instructor?.fullname)
                        .join(", ")}
                    </Description>
                  )}
                </Box>
                {video?.description && <Markdown text={video?.description} />}
              </Stack>
            </CardBody>
          </Card>
        </Box>
        <Box flex="1">
          <Stack direction="column" spacing="5">
            {isLoadingModules ? (
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
                  <ModulesList
                    activeModuleIndex={activeModuleIndex}
                    modules={modules}
                  />
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
        </Box>
      </Stack>
    </Container>
  );
};

const CourseVideoPageWithLayout = () => (
  <CourseLayout>
    <Navbar />
    <CourseVideoPage />
  </CourseLayout>
);

export { CourseVideoPageWithLayout as CourseVideoPage };
