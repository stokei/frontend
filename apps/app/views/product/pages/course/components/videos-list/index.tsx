import { Stack } from "@stokei/ui";

import {
  CoursePageModuleFragment,
  CoursePageModuleVideoFragment,
} from "../../graphql/module.fragment.graphql.generated";
import { VideoItem } from "../video-item";

interface VideosListProps {
  readonly onOpenPreviewModal: (video?: CoursePageModuleVideoFragment) => void;
  readonly videos?: CoursePageModuleFragment["videos"];
}

export const VideosList = ({ videos, onOpenPreviewModal }: VideosListProps) => {
  return (
    <Stack direction="column" spacing="2">
      {videos?.items?.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          onOpenPreviewModal={() => onOpenPreviewModal(video)}
        />
      ))}
    </Stack>
  );
};
