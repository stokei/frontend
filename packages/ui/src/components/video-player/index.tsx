import { Stream } from "@cloudflare/stream-react";
import React, { useMemo, useRef } from "react";

import ReactPlayer from "react-player";

import { AspectRatio } from "../aspect-ratio";
import { Box, BoxProps } from "../box";

const CloudflareStream = (props: any) => (
  <Box
    sx={{
      position: "initial !important",
      padding: "0 !important",
    }}
    {...props}
    as={Stream}
  />
);

export interface VideoPlayerProps extends BoxProps {
  readonly id: string;
  readonly src: string;
  readonly filename: string;
}

export const VideoPlayer = ({
  id,
  src,
  filename,
  ...props
}: VideoPlayerProps) => {
  const playerRef = useRef<any>(null);

  const videoContainerID = id + "-video-container";

  const isCloudflareVideo = useMemo(() => {
    const isCloudflare = !!src?.match(/cloudflarestream/i);
    return isCloudflare;
  }, [src]);

  return (
    <Box
      width="full"
      flexDirection="column"
      overflow="hidden"
      rounded="md"
      {...props}
    >
      <AspectRatio maxWidth="full" ratio={16 / 9}>
        {isCloudflareVideo ? (
          <CloudflareStream controls src={filename} />
        ) : (
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
        )}
      </AspectRatio>
    </Box>
  );
};
