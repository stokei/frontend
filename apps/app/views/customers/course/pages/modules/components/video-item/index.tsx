import posterImage from "@/assets/no-image.png";
import { useCustomersCourse, useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
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
import { useMemo } from "react";
import { CustomersCoursePageModuleVideoFragment } from "../../graphql/modules.query.graphql.generated";

interface VideoItemProps {
  readonly video?: CustomersCoursePageModuleVideoFragment;
}

export const VideoItem = ({ video }: VideoItemProps) => {
  const translate = useTranslations();

  const { course } = useCustomersCourse();

  const viewVideoURL = useMemo(
    () =>
      appRoutes.customers.course({ course: course?.id }).video({
        video: video?.id || "",
      }),
    [course, video]
  );

  return (
    <Link as={NextLink} href={viewVideoURL}>
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
