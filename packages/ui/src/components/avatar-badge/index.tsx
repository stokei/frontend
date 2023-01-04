import {
  AvatarBadge as ChakraAvatarBadge,
  AvatarBadgeProps as ChakraAvatarBadgeProps,
} from "@chakra-ui/react";

export interface AvatarBadgeProps extends ChakraAvatarBadgeProps {}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  children,
  ...props
}) => <ChakraAvatarBadge {...props}>{children}</ChakraAvatarBadge>;
