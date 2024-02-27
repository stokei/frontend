import { VideoPlayer, VideoPlayerProps } from "../video-player";

export interface HeroVideoPlayerProps extends VideoPlayerProps {}
export const HeroVideoPlayer = ({ ...props }: HeroVideoPlayerProps) => (
  <VideoPlayer width="full" {...props} />
);
