import { Text, TextProps } from "../../text";

export interface VideoPlayerTimeProps extends TextProps {}
export const VideoPlayerTime: React.FC<VideoPlayerTimeProps> = ({
  children,
  ...props
}) => (
  <Text
    color="white.500"
    textShadow="sm"
    lineHeight="shorter"
    fontSize="xs"
    {...props}
  >
    {children}
  </Text>
);
