import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
  useToast,
} from "@stokei/ui";
import { FC } from "react";
import { AdminCoursePageEditVideoFragment } from "../../graphql/video.query.graphql.generated";
import { useRemoveVideoMutation } from "../../graphql/remove-video.mutation.graphql.generated";

interface RemoveVideoModalProps {
  videoId?: string;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onSuccessRemoveVideo: (module: AdminCoursePageEditVideoFragment) => void;
}

export const RemoveVideoModal: FC<RemoveVideoModalProps> = ({
  videoId,
  isOpenModal,
  onCloseModal,
  onSuccessRemoveVideo,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCreateVideo }, removeVideo] =
    useRemoveVideoMutation();

  const onRemoveVideo = async () => {
    try {
      const response = await removeVideo({
        input: {
          where: {
            video: videoId || "",
          },
        },
      });
      if (!!response?.data?.removeVideo) {
        onSuccessRemoveVideo(response?.data?.removeVideo);
        onShowToast({
          title: translate.formatMessage({
            id: "videoRemovedSuccessfully",
          }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeVideo" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Text>
          {translate.formatMessage({
            id: "wouldYouReallyLikeToRemoveVideo",
          })}
        </Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingCreateVideo}
            onClick={onRemoveVideo}
          >
            {translate.formatMessage({ id: "removeVideo" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
