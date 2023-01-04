import {
  AvatarGroup as ChakraAvatarGroup,
  AvatarGroupProps as ChakraAvatarGroupProps,
} from "@chakra-ui/react";

export interface AvatarGroupProps extends ChakraAvatarGroupProps {}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  ...props
}) => <ChakraAvatarGroup {...props}>{children}</ChakraAvatarGroup>;
