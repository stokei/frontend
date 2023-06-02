import { useTranslations } from "../../hooks";
import { AspectRatio, AspectRatioProps } from "../aspect-ratio";
import { Box } from "../box";
import { Image } from "../image";
import { Text } from "../text";

export interface VideoPlayerPosterProps extends AspectRatioProps {
  readonly src: string;
  readonly fallbackSrc?: string;
  readonly duration?: number;
}
export const VideoPlayerPoster: React.FC<VideoPlayerPosterProps> = ({
  src,
  fallbackSrc,
  duration,
  ...props
}) => {
  const translate = useTranslations();
  return (
    <Box
      width="full"
      height="fit-content"
      position="relative"
      flexDirection="column"
      rounded="md"
      {...props}
    >
      <AspectRatio width="full" ratio={16 / 9}>
        <Image
          width="full"
          alt="VideoPoster"
          src={src}
          fallbackSrc={fallbackSrc}
        />
      </AspectRatio>
      {!!duration && (
        <Box
          rounded="md"
          paddingX="2"
          paddingY="1"
          background="rgba(0,0,0,.7)"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bottom="2"
          right="2"
        >
          <Text fontSize={["xs", "xs", "md", "md"]} color="white.500">
            {translate.formatTime(duration || 0)}
          </Text>
        </Box>
      )}
    </Box>
  );
};
