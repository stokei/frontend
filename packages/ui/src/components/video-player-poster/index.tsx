import { secondsToTime } from "../../utils/seconds-to-time";
import { Box, BoxProps } from "../box";
import { Image } from "../image";
import { VideoPlayerTime } from "../video-player/time";

export interface VideoPlayerPosterProps extends BoxProps {
  readonly src: string;
  readonly duration: number;
}
export const VideoPlayerPoster: React.FC<VideoPlayerPosterProps> = ({
  src,
  duration,
  ...props
}) => (
  <Box flex="1" position="relative" {...props}>
    {src ? <Image width="full" alt="VideoPoster" src={src} /> : undefined}

    <Box
      width="full"
      justifyContent="flex-end"
      paddingY="3"
      paddingX="4"
      position="absolute"
      bottom={0}
      left={0}
    >
      <Box
        rounded="md"
        paddingX="2"
        paddingY="1"
        background="rgba(0,0,0,.7)"
        alignItems="center"
        justifyContent="center"
      >
        <VideoPlayerTime>{secondsToTime(duration)}</VideoPlayerTime>
      </Box>
    </Box>
  </Box>
);
