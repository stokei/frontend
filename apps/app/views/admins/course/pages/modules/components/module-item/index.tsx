import { useTranslations } from "@/hooks";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Box,
  Button,
  Icon,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Text,
} from "@stokei/ui";
import { FC, memo } from "react";

import {
  AdminCoursePageModuleFragment,
  AdminCoursePageModuleVideoFragment,
} from "../../graphql/modules.query.graphql.generated";
import { VideosList } from "../videos-list";
import { useRouter } from "next/router";
import { routes } from "@/routes";

export interface ModuleItemProps {
  readonly isFirstModule: boolean;
  readonly module: AdminCoursePageModuleFragment;
  readonly onOpenConfirmVideoPreviewModal: (
    video?: AdminCoursePageModuleVideoFragment
  ) => void;
  readonly onOpenConfirmRemoveModuleModal: (
    module?: AdminCoursePageModuleFragment
  ) => void;
}

export const ModuleItem: FC<ModuleItemProps> = memo(
  ({
    module,
    isFirstModule,
    onOpenConfirmVideoPreviewModal,
    onOpenConfirmRemoveModuleModal,
  }) => {
    const router = useRouter();
    const translate = useTranslations();

    const goToAddVideoPage = () => {
      router.push(
        routes.admins
          .course({ course: module.parent })
          .modules.addVideo({ module: module.id })
      );
    };

    return (
      <Accordion defaultIndex={!!isFirstModule ? [0] : undefined}>
        <AccordionItem>
          <AccordionButton>
            <AccordionLabel>{module.name}</AccordionLabel>
            <Box marginRight="5">
              <Icon
                name="trash"
                onClick={() => onOpenConfirmRemoveModuleModal(module)}
              />
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {!module?.videos?.totalCount ? (
              <NotFound>
                <NotFoundIcon name="video" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "videosNotFound" })}
                </NotFoundSubtitle>
                <Button onClick={goToAddVideoPage}>
                  {translate.formatMessage({ id: "addVideo" })}
                </Button>
              </NotFound>
            ) : (
              <VideosList
                videos={module?.videos?.items || []}
                onOpenConfirmVideoPreviewModal={onOpenConfirmVideoPreviewModal}
              />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
);

ModuleItem.displayName = "ModuleItem";
