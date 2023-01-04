import { useDisclosure } from "../use-disclosure";

export const useVideoPictureInPicture = () => {
  const {
    isOpen: isPictureInPicture,
    onClose: onClosePictureInPicture,
    onOpen: onOpenPictureInPicture,
    onToggle: onTogglePictureInPicture,
  } = useDisclosure();

  return {
    isPictureInPicture,
    onOpenPictureInPicture,
    onClosePictureInPicture,
    onTogglePictureInPicture,
  };
};
