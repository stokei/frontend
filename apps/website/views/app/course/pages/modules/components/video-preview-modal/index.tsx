import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader, Title, VideoPlayer } from "@stokei/ui";

export interface VideoPreviewModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly videoId?: string;
  readonly videoName?: string;
  readonly videoURL?: string;
  readonly videoFilename: string;
}

export const VideoPreviewModal = ({
  isOpen,
  onClose,
  videoURL,
  videoId,
  videoName,
  videoFilename,
}: VideoPreviewModalProps) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>
        <Title size="md">{videoName}</Title>
      </ModalHeader>
      <ModalBody>
        <VideoPlayer
          id={"my-preview-player" + videoId}
          filename={videoFilename}
          src={videoURL || ""}
        />
      </ModalBody>
    </Modal>
  );
};
