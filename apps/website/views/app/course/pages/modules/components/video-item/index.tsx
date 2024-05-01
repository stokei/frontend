import posterImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Badge,
  Box,
  Link,
  Stack,
  Text,
  Title,
  VideoPlayerPoster,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AdminCoursePageModuleVideoFragment } from "../../graphql/modules.query.graphql.generated";

interface VideoItemProps {
  readonly video?: AdminCoursePageModuleVideoFragment;
}

export const VideoItem = ({ video }: VideoItemProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const editVideoURL = useMemo(
    () =>
      websiteRoutes
        .app({ appId: currentApp?.id })
        .course({ course: courseId })
        .modules.editVideo({
          module: video?.parent || "",
          video: video?.id || "",
        }),
    [courseId, currentApp?.id, video?.id, video?.parent]
  );

  return (
    <Link as={NextLink} href={editVideoURL}>
      <Stack flex="1" direction="row" spacing="5">
        <VideoPlayerPoster
          width={["28", "20", "40", "40"]}
          duration={video?.file?.duration || 0}
          src={video?.poster?.file?.url || ""}
          fallbackSrc={posterImage.src}
        />

        <Stack width="auto" flex="1" direction="column" spacing="2">
          <Title fontSize="md">{video?.name}</Title>

          {video?.file?.duration && video?.file?.duration >= 0 ? (
            <Text>{translate.formatTime(video?.file?.duration || 0)}</Text>
          ) : (
            <>
              {(!video?.active || !video?.file) && (
                <Text textTransform="uppercase">
                  {translate.formatMessage({ id: "comingSoon" })}
                </Text>
              )}
            </>
          )}

          {!video?.private && (
            <Box>
              <Badge colorScheme="gray">
                {translate.formatMessage({ id: "public" })}
              </Badge>
            </Box>
          )}
        </Stack>
      </Stack>
    </Link>
  );
};
