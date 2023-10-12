import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader, Title, VideoPlayer } from "@stokei/ui";
import { FC } from "react";

export interface VideoPreviewModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly videoId: string;
  readonly videoName: string;
  readonly videoFilename: string;
  readonly videoURL?: string;
}

export const VideoPreviewModal: FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  videoURL,
  videoId,
  videoName,
  videoFilename,
}) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>
        <Title size="md">{videoName}</Title>
      </ModalHeader>
      <ModalBody>
        <VideoPlayer
          id={"my-preview-player" + videoId}
          src={videoURL || ""}
          filename={videoFilename}
        />
      </ModalBody>
    </Modal>
  );
};
