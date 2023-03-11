import { VideoPlayer, VideoPlayerProps } from "../video-player";

export interface HeroVideoPlayerProps extends VideoPlayerProps {}
export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  ...props
}) => <VideoPlayer width="full" {...props} />;
