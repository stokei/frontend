import { Stack } from "@stokei/ui";
import { FC } from "react";
import { AdminCoursePageModuleVideoFragment } from "../../graphql/modules.query.graphql.generated";
import { VideoItem } from "../video-item";

interface VideosListProps {
  readonly onOpenConfirmVideoPreviewModal: (
    video?: AdminCoursePageModuleVideoFragment
  ) => void;
  readonly videos?: AdminCoursePageModuleVideoFragment[];
}

export const VideosList: FC<VideosListProps> = ({
  videos,
  onOpenConfirmVideoPreviewModal,
}) => {
  return (
    <Stack direction="column" spacing="2">
      {videos?.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          onOpenConfirmVideoPreviewModal={() =>
            onOpenConfirmVideoPreviewModal(video)
          }
        />
      ))}
    </Stack>
  );
};
