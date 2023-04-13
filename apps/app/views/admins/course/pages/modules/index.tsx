import { usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Box,
  Button,
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { CourseLayout } from "../../layout";
import { AddModuleDrawer } from "./components/add-module";
import { ModuleLoading } from "./components/module-loading";
import { ModulesList } from "./components/modules-list";
import { Navbar } from "./components/navbar";
import {
  useGetAdminCoursePageModulesQuery,
  AdminCoursePageModuleFragment,
  AdminCoursePageModuleVideoFragment,
} from "./graphql/modules.query.graphql.generated";
import { VideoPreviewModal } from "./components/video-preview-modal";
import { RemoveModuleModal } from "./components/remove-module-modal";
import { EditModuleDrawer } from "./components/edit-module";

interface CourseModulesPageProps {}

export const CourseModulesPage: FC<CourseModulesPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const [modalVideoPreview, setModalVideoPreview] =
    useState<AdminCoursePageModuleVideoFragment>();
  const [modalModule, setModalModule] =
    useState<AdminCoursePageModuleFragment>();
  const [moduleEditDrawer, setModuleEditDrawer] =
    useState<AdminCoursePageModuleFragment>();
  const [modules, setModules] = useState<AdminCoursePageModuleFragment[]>([]);
  const { currentPage, onChangePage } = usePagination();
  const {
    isOpen: isOpenCreateModule,
    onClose: onCloseCreateModule,
    onOpen: onOpenCreateModule,
  } = useDisclosure();
  const {
    isOpen: isOpenVideoPreview,
    onClose: onCloseVideoPreview,
    onOpen: onOpenVideoPreview,
  } = useDisclosure();
  const {
    isOpen: isOpenRemoveModuleModal,
    onClose: onCloseRemoveModuleModal,
    onOpen: onOpenRemoveModuleModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModuleDrawer,
    onClose: onCloseEditModuleDrawer,
    onOpen: onOpenEditModuleDrawer,
  } = useDisclosure();

  const onOpenEditModule = (module?: AdminCoursePageModuleFragment) => {
    setModuleEditDrawer(module);
    onOpenEditModuleDrawer();
  };
  const onOpenConfirmRemoveModuleModal = (
    module?: AdminCoursePageModuleFragment
  ) => {
    setModalModule(module);
    onOpenRemoveModuleModal();
  };

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [{ fetching: isLoading, data: dataModules }] =
    useGetAdminCoursePageModulesQuery({
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        where: {
          AND: {
            parent: {
              equals: courseId,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Asc,
        },
      },
    });

  useEffect(() => {
    setModules(dataModules?.modules?.items || []);
  }, [dataModules]);

  const onAddModule = useCallback(
    (module: AdminCoursePageModuleFragment) => {
      setModules((currentModules) => [...currentModules, module]);
      onCloseCreateModule();
    },
    [onCloseCreateModule]
  );
  const onEditModule = useCallback(
    (module: AdminCoursePageModuleFragment) => {
      setModules((currentModules) => {
        return currentModules.map((currentModule) => {
          if (currentModule.id === module.id) {
            return module;
          }
          return currentModule;
        });
      });
      onCloseEditModuleDrawer();
    },
    [onCloseEditModuleDrawer]
  );
  const onRemoveModule = useCallback(
    (module: AdminCoursePageModuleFragment) => {
      setModules((currentModules) =>
        currentModules?.filter(
          (currentModule) => currentModule?.id !== module?.id
        )
      );
      onCloseRemoveModuleModal();
    },
    [onCloseRemoveModuleModal]
  );

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <VideoPreviewModal
            videoId={modalVideoPreview?.id}
            videoName={modalVideoPreview?.name}
            videoURL={modalVideoPreview?.file?.url || ""}
            onClose={onCloseVideoPreview}
            isOpen={isOpenVideoPreview}
          />
          <AddModuleDrawer
            isOpenDrawer={isOpenCreateModule}
            onCloseDrawer={onCloseCreateModule}
            courseId={courseId}
            onSuccess={onAddModule}
          />
          <EditModuleDrawer
            isOpenDrawer={isOpenEditModuleDrawer}
            onCloseDrawer={onCloseEditModuleDrawer}
            module={moduleEditDrawer}
            onSuccess={onEditModule}
          />
          <RemoveModuleModal
            moduleId={modalModule?.id}
            isOpenModal={isOpenRemoveModuleModal}
            onCloseModal={onCloseRemoveModuleModal}
            onSuccessRemoveModule={onRemoveModule}
          />

          {modules?.length > 1 && (
            <Box width="full">
              <Button onClick={onOpenCreateModule}>
                {translate.formatMessage({ id: "addModule" })}
              </Button>
            </Box>
          )}

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
                  <Button onClick={onOpenCreateModule}>
                    {translate.formatMessage({ id: "addModule" })}
                  </Button>
                </NotFound>
              ) : (
                <ModulesList
                  modules={modules}
                  onOpenEditModule={onOpenEditModule}
                  onOpenConfirmRemoveModuleModal={
                    onOpenConfirmRemoveModuleModal
                  }
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
      </Container>
    </CourseLayout>
  );
};
