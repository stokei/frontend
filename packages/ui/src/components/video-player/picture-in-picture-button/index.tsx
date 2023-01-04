import { Box, BoxProps } from "../../box";
import { IconButton } from "../../icon-button";
import { useVideoPlayer } from "../../../hooks/use-video-player";

export interface VideoPlayerPictureInPictureButtonProps extends BoxProps {}
export const VideoPlayerPictureInPictureButton: React.FC<
  VideoPlayerPictureInPictureButtonProps
> = ({ ...props }) => {
  const { isPictureInPicture, onTogglePictureInPicture } = useVideoPlayer();

  return (
    <Box alignItems="center" {...props}>
      <IconButton
        fontSize="2xl"
        height="9"
        variant="link"
        name={!isPictureInPicture ? "pictureInPicture" : "exitPictureInPicture"}
        onClick={onTogglePictureInPicture}
        colorScheme="white"
      />
    </Box>
  );
};
