import { forwardRef } from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import { AspectRatio } from "../aspect-ratio";
import { Box, BoxProps } from "../box";
import { VideoPlayerBigPlayButton } from "./big-play-button";
import { VideoPlayerControls } from "./controls";
import { VideoPlayerPoster } from "../video-player-poster";
import { VideoPlayerProvider } from "../../contexts";
import {
  useVideoPictureInPicture,
  useVideoPlaying,
  useVideoVolume,
  useVideoFullScreen,
  useVideoSpeed,
} from "../../hooks";
import { Loading } from "../loading";

type VideoProps = BoxProps &
  Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "height" | "width" | "color"
  >;
const Video: React.FC<VideoProps> = forwardRef(({ ...props }, ref) => (
  <Box as="video" width="full" height="full" {...props} ref={ref} />
));

export interface VideoPlayerViewerData {
  readonly userId: string;
  readonly fullname: string;
}
export interface VideoPlayerProps extends BoxProps {
  readonly id: string;
  readonly src: string;
  readonly videoId: string;
  readonly videoName: string;
  readonly viewer?: VideoPlayerViewerData;
  readonly poster: string;
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  id,
  src,
  poster,
  videoId,
  videoName,
  ...props
}) => {
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isVideoHover, setIsVideoHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowingControls, setIsShowingControls] = useState<boolean>(false);
  const { isPlaying, onPause, onPlay, onTogglePlaying, isFirstPlay } =
    useVideoPlaying();
  const { volume, isMuted, onToggleMute, onChangeVolume } = useVideoVolume();
  const { speed, onChangeSpeed } = useVideoSpeed();
  const { isFullScreen, onToggleFullScreen, onCloseFullScreen } =
    useVideoFullScreen();
  const {
    isPictureInPicture,
    onTogglePictureInPicture,
    onClosePictureInPicture,
  } = useVideoPictureInPicture();

  const videoContainerID = id + "-video-container";

  useEffect(() => {
    if (isFullScreen) {
      const element = document?.getElementById(videoContainerID);
      element
        ?.requestFullscreen({ navigationUI: "hide" })
        .catch((error) => console.log(error.message));
    } else {
      const isOpenFullScreen = document?.fullscreenElement;
      if (isOpenFullScreen) {
        document.exitFullscreen().catch((error) => console.log(error.message));
      }
    }
  }, [videoContainerID, isFullScreen]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener("enterpictureinpicture", () => {
        onCloseFullScreen();
      });
      playerRef.current.addEventListener("leavepictureinpicture", () => {
        onClosePictureInPicture();
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener(
          "enterpictureinpicture",
          () => {}
        );
        playerRef.current.removeEventListener(
          "leavepictureinpicture",
          () => {}
        );
      }
    };
  }, [onClosePictureInPicture, onCloseFullScreen]);

  useEffect(() => {
    if (isPictureInPicture) {
      if (playerRef.current) {
        playerRef.current
          ?.requestPictureInPicture()
          .catch((error: Error) => console.log(error.message));
      }
    } else {
      const isOpenPictureInPicture = document?.pictureInPictureElement;
      if (isOpenPictureInPicture) {
        document
          .exitPictureInPicture()
          .catch((error) => console.log(error.message));
      }
    }
  }, [isPictureInPicture]);

  useEffect(() => {
    if (playerRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(playerRef.current);
      } else if (
        playerRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        playerRef.current.src = src;
      }
    }
    return () => {
      if (playerRef.current) {
        playerRef.current = undefined;
      }
    };
  }, [src]);

  useEffect(() => {
    let timeout: any;
    if (isPlaying) {
      setIsShowingControls(true);
      timeout = setTimeout(() => setIsShowingControls(false), 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPlaying, isVideoHover]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  }, [speed]);

  const onReloadClicked = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
    }
    onPlay();
  }, [onPlay]);

  const onChangeCurrentTime = useCallback((e: any) => {
    setCurrentTime(e.target?.currentTime);
  }, []);

  const onChangeCurrentTimeToProgress = useCallback(
    (time: number) => {
      onPause();
      setCurrentTime(time);
      if (playerRef.current) {
        playerRef.current.currentTime = time;
      }
    },
    [onPause]
  );

  const videoDuration = useMemo(() => {
    if (duration > 0) {
      return duration;
    }
    return 0;
  }, [duration]);

  const fullScreenStyle: any = useMemo(() => {
    if (isFullScreen) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
        width: "full",
        height: "full",
        borderRadius: "none",
      };
    }
  }, [isFullScreen]);

  return (
    <VideoPlayerProvider
      poster={poster}
      duration={videoDuration}
      currentTime={currentTime}
      volume={volume}
      speed={speed}
      onChangeSpeed={onChangeSpeed}
      isMuted={isMuted}
      isPlaying={isPlaying}
      isLoading={isLoading}
      isFullScreen={isFullScreen}
      isPictureInPicture={isPictureInPicture}
      onPlay={onPlay}
      onPause={onPause}
      onReload={onReloadClicked}
      onTogglePlaying={onTogglePlaying}
      onChangeCurrentTime={onChangeCurrentTimeToProgress}
      onToggleMute={onToggleMute}
      onChangeVolume={onChangeVolume}
      onToggleFullScreen={onToggleFullScreen}
      onTogglePictureInPicture={onTogglePictureInPicture}
    >
      <Box
        width="full"
        position="relative"
        flexDir="column"
        onMouseEnter={isPlaying ? () => setIsVideoHover(true) : undefined}
        onMouseLeave={isPlaying ? () => setIsVideoHover(false) : undefined}
        {...props}
        {...fullScreenStyle}
        id={videoContainerID}
      >
        <AspectRatio ratio={16 / 9}>
          <Box width="full" flex="1">
            <Video
              id={id}
              ref={playerRef}
              controlsList="nodownload"
              poster={poster}
              src={src}
              border={0}
              backgroundColor="black.900"
              rounded="md"
              overflow="hidden"
              onClick={onTogglePlaying}
              onPlay={onPlay}
              onPause={onPause}
              onDurationChange={(e) =>
                setDuration((e.target as any).duration ?? 0)
              }
              onTimeUpdate={onChangeCurrentTime}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onContextMenu={(event) => event.preventDefault()}
            />
            {isFirstPlay ? (
              <Box width="full" position="absolute" bottom={0} left={0}>
                {(!isPlaying || isVideoHover || isShowingControls) && (
                  <VideoPlayerControls />
                )}
              </Box>
            ) : (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="full"
                height="full"
                flexDir="column"
                justifyContent="flex-end"
                onContextMenu={(event) => event.preventDefault()}
              >
                <VideoPlayerPoster src={poster} duration={videoDuration} />
                <Box
                  width="full"
                  height="full"
                  zIndex="1"
                  position="absolute"
                  bottom={0}
                  left={0}
                  flex="1"
                  justifyContent="center"
                  alignItems="center"
                >
                  {isLoading ? (
                    <Loading size="lg" />
                  ) : (
                    <VideoPlayerBigPlayButton justifyContent="center" />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </AspectRatio>
      </Box>
    </VideoPlayerProvider>
  );
};
