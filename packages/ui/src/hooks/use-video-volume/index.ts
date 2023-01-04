import { useCallback, useState, useMemo } from "react";
import { useDisclosure } from "../use-disclosure";

const DEFAULT_INITIAL_VOLUME = 0.5;
export const useVideoVolume = () => {
  const [volume, setVolume] = useState<number>(DEFAULT_INITIAL_VOLUME);

  const isMuted = useMemo(() => volume === 0, [volume]);

  const onChangeVolume = useCallback(
    (vol: number) => setVolume(vol > 0 ? vol : 0),
    []
  );

  const onMute = useCallback(() => {
    setVolume(0);
  }, []);

  const onUnmute = useCallback(() => {
    setVolume(DEFAULT_INITIAL_VOLUME);
  }, []);

  const onToggleMute = useCallback(() => {
    if (!isMuted) {
      onMute();
    } else {
      onUnmute();
    }
  }, [isMuted, onMute, onUnmute]);

  return {
    volume,
    isMuted,
    onMute,
    onUnmute,
    onToggleMute,
    onChangeVolume,
  };
};
