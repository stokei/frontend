import { useTranslations } from "@/hooks";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Text,
  useDisclosure,
} from "@stokei/ui";
import { useState } from "react";
import { VideoPreviewModal } from "../video-preview-modal";

import {
  CoursePageModuleFragment,
  CoursePageModuleVideoFragment,
} from "../../graphql/module.fragment.graphql.generated";
import { VideosList } from "../videos-list";

export interface ModuleItemProps {
  readonly module: CoursePageModuleFragment;
}

export const ModuleItem = ({ module }: ModuleItemProps) => {
  const translate = useTranslations();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [modalVideo, setModalVideo] = useState<CoursePageModuleVideoFragment>();

  const onOpenPreviewModal = (video: any) => {
    setModalVideo(video);
    onOpen();
  };

  return (
    <>
      <VideoPreviewModal
        videoId={modalVideo?.id || ""}
        videoName={modalVideo?.name || ""}
        videoFilename={modalVideo?.file?.filename || ""}
        videoURL={modalVideo?.file?.url || ""}
        onClose={onClose}
        isOpen={isOpen}
      />
      <AccordionItem>
        <AccordionButton>
          <AccordionLabel>{module.name}</AccordionLabel>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          {!module?.videos?.totalCount ? (
            <Text>{translate.formatMessage({ id: "notFoundVideos" })}</Text>
          ) : (
            <VideosList
              videos={module?.videos}
              onOpenPreviewModal={onOpenPreviewModal}
            />
          )}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};
