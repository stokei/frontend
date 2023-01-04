import { useDisclosure } from "../use-disclosure";

export const useVideoFullScreen = () => {
  const {
    isOpen: isFullScreen,
    onClose: onCloseFullScreen,
    onOpen: onOpenFullScreen,
    onToggle: onToggleFullScreen,
  } = useDisclosure();

  return {
    isFullScreen,
    onOpenFullScreen,
    onCloseFullScreen,
    onToggleFullScreen,
  };
};
