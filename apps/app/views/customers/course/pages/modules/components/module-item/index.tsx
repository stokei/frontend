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

import { useRouter } from "next/router";
import { CustomersCoursePageModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { VideosList } from "../videos-list";

export interface ModuleItemProps {
  readonly isFirstModule: boolean;
  readonly module: CustomersCoursePageModuleFragment;
}

export const ModuleItem = ({ module, isFirstModule }: ModuleItemProps) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Accordion defaultIndex={!!isFirstModule ? [0] : undefined}>
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
};
