import { Stack } from "@stokei/ui";

import { AdminCoursePageModuleVideoFragment } from "../../graphql/modules.query.graphql.generated";
import { VideoItem } from "../video-item";

interface VideosListProps {
  readonly videos?: AdminCoursePageModuleVideoFragment[];
}

export const VideosList = ({ videos }: VideosListProps) => {
  return (
    <Stack direction="column" spacing="5">
      {videos?.map((video) => <VideoItem key={video.id} video={video} />)}
    </Stack>
  );
};
