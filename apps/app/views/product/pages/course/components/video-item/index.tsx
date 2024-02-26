import { useTranslations } from "@/hooks";
import { Box, Icon, Link, Stack, Text } from "@stokei/ui";
import { memo } from "react";
import { CoursePageModuleVideoFragment } from "../../graphql/module.fragment.graphql.generated";

interface VideoItemProps {
  readonly video?: CoursePageModuleVideoFragment;
  readonly onOpenPreviewModal: () => void;
}

export const VideoItem = memo(
  ({ video, onOpenPreviewModal }: VideoItemProps) => {
    const translate = useTranslations();

    return (
      <Box width="full" align="center">
        <Stack flex="1" direction="row" spacing="2" align="center">
          <Icon name="video" />
          <Text>{video?.name}</Text>
        </Stack>

        <Stack width="auto" direction="row" spacing="3" align="center">
          {!video?.private && !!video?.file && (
            <Link onClick={onOpenPreviewModal}>
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
