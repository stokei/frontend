import { useTranslations } from "@/hooks";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Button,
  Icon,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Stack,
} from "@stokei/ui";
import { FC, memo } from "react";

import { routes } from "@/routes";
import { useRouter } from "next/router";
import {
  AdminCoursePageModuleFragment,
  AdminCoursePageModuleVideoFragment,
} from "../../graphql/modules.query.graphql.generated";
import { VideosList } from "../videos-list";

export interface ModuleItemProps {
  readonly isFirstModule: boolean;
  readonly module: AdminCoursePageModuleFragment;
  readonly onOpenEditModule: (module?: AdminCoursePageModuleFragment) => void;
  readonly onOpenConfirmRemoveModuleModal: (
    module?: AdminCoursePageModuleFragment
  ) => void;
}

export const ModuleItem: FC<ModuleItemProps> = memo(
  ({
    module,
    isFirstModule,
    onOpenConfirmRemoveModuleModal,
    onOpenEditModule,
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
            <Stack
              width="fit-content"
              direction="row"
              spacing="5"
              marginRight="5"
            >
              <Icon name="plus" onClick={goToAddVideoPage} />
              <Icon name="edit" onClick={() => onOpenEditModule(module)} />
              <Icon
                name="trash"
                onClick={() => onOpenConfirmRemoveModuleModal(module)}
              />
            </Stack>
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
              <VideosList videos={module?.videos?.items || []} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
);

ModuleItem.displayName = "ModuleItem";
