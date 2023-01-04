import { useState } from "react";
import { secondsToTime } from "../../../utils/seconds-to-time";
import { Box, BoxProps } from "../../box";
import { Slider } from "../../slider";
import { SliderFilledTrack } from "../../slider-filled-track";
import { SliderThumb } from "../../slider-thumb";
import { SliderTrack } from "../../slider-track";
import { Tooltip } from "../../tooltip";
import { useVideoPlayer } from "../../../hooks/use-video-player";

export interface VideoPlayerVolumeProps extends BoxProps {}
export const VideoPlayerVolume: React.FC<VideoPlayerVolumeProps> = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { currentTime, duration, onChangeCurrentTime } = useVideoPlayer();

  return (
    <Box flex="1" position="relative">
      <Slider
        defaultValue={currentTime}
        value={currentTime}
        min={0}
        max={duration}
        colorScheme="primary"
        onChange={onChangeCurrentTime}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <Tooltip
          hasArrow
          bg="primary.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={secondsToTime(currentTime)}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
};
