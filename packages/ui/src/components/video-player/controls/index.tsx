import React from "react";
import { useVideoPlayer } from "../../../hooks/use-video-player";
import { secondsToTime } from "../../../utils/seconds-to-time";
import { Box, BoxProps } from "../../box";
import { Stack } from "../../stack";
import { VideoPlayerFullScreenButton } from "../fullscreen-button";
import { VideoPlayerPictureInPictureButton } from "../picture-in-picture-button";
import { VideoPlayerPlayButton } from "../play-button";
import { VideoPlayerProgress } from "../progress";
import { VideoPlayerSpeed } from "../speed";
import { VideoPlayerTime } from "../time";
import { VideoPlayerVolumeButton } from "../volume-button";

export interface VideoPlayerControlsProps extends BoxProps {}
export const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = () => {
  const { duration, currentTime } = useVideoPlayer();
  return (
    <Stack
      width="full"
      spacing="0"
      paddingY="3"
      paddingX="4"
      direction="column"
      background="rgba(0,0,0,.5)"
      boxShadow="dark-lg"
    >
      <Box width="full">
        <VideoPlayerProgress />
      </Box>
      <Stack spacing="4" direction="row" alignItems="center" rounded="md">
        <Stack spacing="2" direction="row" alignItems="center">
          <VideoPlayerPlayButton />
          <VideoPlayerVolumeButton />
        </Stack>
        <Stack spacing="1" direction="row">
          <VideoPlayerTime>{secondsToTime(currentTime)}</VideoPlayerTime>
          <VideoPlayerTime>/</VideoPlayerTime>
          <VideoPlayerTime>{secondsToTime(duration)}</VideoPlayerTime>
        </Stack>
        <Stack
          flex="1"
          spacing="2"
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <VideoPlayerSpeed />
          <VideoPlayerPictureInPictureButton />
          <VideoPlayerFullScreenButton />
        </Stack>
      </Stack>
    </Stack>
  );
};
