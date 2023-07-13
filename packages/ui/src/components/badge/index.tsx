import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
} from "@chakra-ui/react";

export interface BadgeProps extends ChakraBadgeProps {}

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => (
  <ChakraBadge
    width="fit-content"
    height="fit-content"
    display="flex"
    colorScheme="primary"
    justifyContent="center"
    alignItems="center"
    paddingY="2px"
    paddingX="2"
    lineHeight="shorter"
    {...props}
  >
    {children}
  </ChakraBadge>
);
