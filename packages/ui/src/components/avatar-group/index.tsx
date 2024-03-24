import {
  AvatarGroup as ChakraAvatarGroup,
  AvatarGroupProps as ChakraAvatarGroupProps,
} from "@chakra-ui/react";

export interface AvatarGroupProps extends ChakraAvatarGroupProps {}

export const AvatarGroup = ({ children, ...props }: AvatarGroupProps) => (
  <ChakraAvatarGroup {...props}>{children}</ChakraAvatarGroup>
);
