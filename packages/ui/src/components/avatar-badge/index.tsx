import {
  AvatarBadge as ChakraAvatarBadge,
  AvatarBadgeProps as ChakraAvatarBadgeProps,
} from "@chakra-ui/react";

export interface AvatarBadgeProps extends ChakraAvatarBadgeProps {}

export const AvatarBadge = ({ children, ...props }: AvatarBadgeProps) => (
  <ChakraAvatarBadge {...props}>{children}</ChakraAvatarBadge>
);
