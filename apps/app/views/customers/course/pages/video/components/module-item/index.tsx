import { useTranslations } from "@/hooks";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
} from "@stokei/ui";
import { memo } from "react";

import { CustomersCoursePageVideoModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { VideosList } from "../videos-list";

export interface ModuleItemProps {
  readonly isOpen: boolean;
  readonly module: CustomersCoursePageVideoModuleFragment;
}

export const ModuleItem = memo(({ module, isOpen }: ModuleItemProps) => {
  const translate = useTranslations();

  return (
    <Accordion defaultIndex={!!isOpen ? [0] : undefined}>
      <AccordionItem>
        <AccordionButton>
          <AccordionLabel>{module.name}</AccordionLabel>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          {!module?.videos?.totalCount ? (
            <NotFound>
              <NotFoundIcon name="video" />
              <NotFoundSubtitle>
                {translate.formatMessage({ id: "videosNotFound" })}
              </NotFoundSubtitle>
            </NotFound>
          ) : (
            <VideosList videos={module?.videos?.items || []} />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

ModuleItem.displayName = "ModuleItem";
