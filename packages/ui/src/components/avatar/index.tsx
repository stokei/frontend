import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from "@chakra-ui/react";

export interface AvatarProps extends ChakraAvatarProps {}

export const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => (
  <ChakraAvatar borderWidth="thin" borderColor="gray.200" {...props}>
    {children}
  </ChakraAvatar>
);
