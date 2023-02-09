import { useTranslations } from "@/hooks";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Box,
  Button,
  Icon,
  Link,
  Stack,
  Text,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, memo, useState } from "react";
import { VideoPreviewModal } from "../video-preview-modal";

import { CoursePageModuleFragment } from "./module.fragment.graphql.generated";

export interface ModuleProps {
  readonly module: CoursePageModuleFragment;
}

export const Module: FC<ModuleProps> = memo(({ module }) => {
  const translate = useTranslations();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [modalVideo, setModalVideo] = useState<any>(null);

  const onOpenPreviewModal = (video: any) => {
    setModalVideo(video);
    onOpen();
  };

  return (
    <>
      <VideoPreviewModal
        videoId={modalVideo?.id}
        videoName={modalVideo?.name}
        videoURL={modalVideo?.file?.url}
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
            <Stack direction="column" spacing="2">
              {module?.videos?.items?.map((video) => (
                <Box key={video.id} width="full" align="center">
                  <Stack flex="1" direction="row" spacing="2" align="center">
                    <Icon name="video" />
                    <Text>{video.name}</Text>
                  </Stack>

                  <Stack
                    width="auto"
                    direction="row"
                    spacing="3"
                    align="center"
                  >
                    {!video.private && !!video.file && (
                      <Link onClick={() => onOpenPreviewModal(video)}>
                        {translate.formatMessage({ id: "view" })}
                      </Link>
                    )}
                    {/**
                     *
                     * FAZER FUNÇÃO DO duration
                     *
                     */}
                    {video.file?.duration && video.file?.duration > 0 ? (
                      <Text>{translate.formatTime(video.file?.duration)}</Text>
                    ) : (
                      <Text textTransform="uppercase">
                        {translate.formatMessage({ id: "comingSoon" })}
                      </Text>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
});
