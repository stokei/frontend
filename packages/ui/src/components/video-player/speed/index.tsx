import { useVideoPlayer } from "../../../hooks/use-video-player";
import { Box, BoxProps } from "../../box";
import { Button } from "../../button";

export interface VideoPlayerSpeedProps extends BoxProps {}
export const VideoPlayerSpeed: React.FC<VideoPlayerSpeedProps> = ({
  ...props
}) => {
  const { speed, onChangeSpeed } = useVideoPlayer();

  return (
    <Box {...props}>
      <Button
        variant="link"
        size="sm"
        colorScheme="white"
        onClick={onChangeSpeed}
        rounded="sm"
        fontWeight="normal"
        _hover={{}}
      >
        {speed} x
      </Button>
    </Box>
  );
};
