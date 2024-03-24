import posterImage from "@/assets/no-image.png";
import { useCustomersCourse, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Badge, Box, Image, Link, Stack, Text, Title } from "@stokei/ui";
import NextLink from "next/link";
import { useMemo } from "react";
import { CustomersCoursePageVideoFragment } from "../../graphql/video.query.graphql.generated";

interface VideoItemProps {
  readonly video?: CustomersCoursePageVideoFragment;
}

export const VideoItem = ({ video }: VideoItemProps) => {
  const translate = useTranslations();

  const { course } = useCustomersCourse();

  const viewVideoURL = useMemo(
    () =>
      routes.customers.course({ course: course?.id }).video({
        video: video?.id || "",
      }),
    [course, video]
  );

  return (
    <Link as={NextLink} href={viewVideoURL}>
      <Stack flex="1" direction="row" spacing="5">
        <Image
          width="20"
          src={video?.poster?.file?.url || ""}
          fallbackSrc={posterImage.src}
          alt={video?.name}
          rounded="md"
        />

        <Stack width="auto" flex="1" direction="column" spacing="2">
          <Title fontSize="md">{video?.name}</Title>

          {video?.active ||
          (video?.file?.duration && video?.file?.duration >= 0) ? (
            <Text>{translate.formatTime(video?.file?.duration || 0)}</Text>
          ) : (
            <Text textTransform="uppercase">
              {translate.formatMessage({ id: "comingSoon" })}
            </Text>
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
