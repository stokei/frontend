import { Box, BoxProps } from "../../box";
import { IconButton } from "../../icon-button";
import { useVideoPlayer } from "../../../hooks/use-video-player";
import { useMemo } from "react";
import { IconName } from "../../icon";

export interface VideoPlayerPlayButtonProps extends BoxProps {}
export const VideoPlayerPlayButton: React.FC<VideoPlayerPlayButtonProps> = ({
  ...props
}) => {
  const { isPlaying, isFinished, onTogglePlaying, onReload } = useVideoPlayer();

  const iconName = useMemo<IconName>(() => {
    if (isFinished) {
      return "reload";
    }
    if (isPlaying) {
      return "pause";
    }
    return "play";
  }, [isPlaying, isFinished]);

  return (
    <Box flex="1" position="relative" {...props}>
      <IconButton
        fontSize="2xl"
        height="9"
        variant="link"
        colorScheme="white"
        name={iconName}
        onClick={isFinished ? onReload : onTogglePlaying}
      />
    </Box>
  );
};
