import React, { useRef } from "react";

import ReactPlayer from "react-player";

import { AspectRatio } from "../aspect-ratio";
import { Box, BoxProps } from "../box";

export interface VideoPlayerProps extends BoxProps {
  readonly id: string;
  readonly src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  id,
  src,
  ...props
}) => {
  const playerRef = useRef<any>(null);

  const videoContainerID = id + "-video-container";

  return (
    <Box width="full" flexDirection="column" {...props}>
      <AspectRatio
        maxWidth="full"
        ratio={16 / 9}
        overflow="hidden"
        rounded="md"
      >
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={src}
          id={videoContainerID}
          ref={playerRef}
          onContextMenu={(e: any) => e.preventDefault()}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      </AspectRatio>
    </Box>
  );
};
