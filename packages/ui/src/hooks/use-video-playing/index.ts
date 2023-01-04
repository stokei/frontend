import { useEffect, useState } from "react";
import { useDisclosure } from "../use-disclosure";

export const useVideoPlaying = () => {
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const {
    isOpen: isPlaying,
    onClose: onPause,
    onOpen: onPlay,
    onToggle: onTogglePlaying,
  } = useDisclosure();

  useEffect(() => {
    if (isPlaying && !isFirstPlay) {
      setIsFirstPlay(true);
    }
  }, [isPlaying, isFirstPlay]);

  return {
    isFirstPlay,
    isPlaying,
    onPause,
    onPlay,
    onTogglePlaying,
  };
};
