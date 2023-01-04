import { useContext } from "react";
import { VideoPlayerContext } from "../../contexts";

export const useVideoPlayer = () => useContext(VideoPlayerContext);
