import { useTranslations } from "@/hooks";
import { Box, Icon, Link, Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";
import { AdminCoursePageModuleVideoFragment } from "../../graphql/modules.query.graphql.generated";

interface VideoItemProps {
  readonly video?: AdminCoursePageModuleVideoFragment;
  readonly onOpenConfirmVideoPreviewModal: () => void;
}

export const VideoItem: FC<VideoItemProps> = memo(
  ({ video, onOpenConfirmVideoPreviewModal }) => {
    const translate = useTranslations();
    console.log(video);
    return (
      <Box width="full" align="center">
        <Stack flex="1" direction="row" spacing="2" align="center">
          <Icon name="video" />
          <Text>{video?.name}</Text>
        </Stack>

        <Stack width="auto" direction="row" spacing="3" align="center">
          {!video?.private && !!video?.file && (
            <Link onClick={onOpenConfirmVideoPreviewModal}>
              {translate.formatMessage({ id: "view" })}
            </Link>
          )}

          {video?.active ||
          (video?.file?.duration && video?.file?.duration >= 0) ? (
            <Text>{translate.formatTime(video?.file?.duration || 0)}</Text>
          ) : (
            <Text textTransform="uppercase">
              {translate.formatMessage({ id: "comingSoon" })}
            </Text>
          )}
        </Stack>
      </Box>
    );
  }
);

VideoItem.displayName = "VideoItem";
