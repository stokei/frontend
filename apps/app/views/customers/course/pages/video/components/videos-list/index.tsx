import { Stack } from "@stokei/ui";
import { FC } from "react";
import { CustomersCoursePageVideoFragment } from "../../graphql/video.query.graphql.generated";
import { VideoItem } from "../video-item";

interface VideosListProps {
  readonly videos?: CustomersCoursePageVideoFragment[];
}

export const VideosList: FC<VideosListProps> = ({ videos }) => {
  return (
    <Stack direction="column" spacing="5">
      {videos?.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </Stack>
  );
};
