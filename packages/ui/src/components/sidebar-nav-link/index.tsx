import { forwardRef, useEffect, useMemo, useState } from "react";
import { Box } from "../box";
import { Icon, IconName } from "../icon";
import { Link, LinkProps } from "../link";
import { Stack } from "../stack";
import { Text } from "../text";

export interface SidebarNavLinkProps extends LinkProps {
  readonly leftIcon?: IconName;
  readonly isActive?: boolean;
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = forwardRef(
  ({ children, isActive, leftIcon, ...props }, ref) => {
    const [activeStyle, setActiveStyle] = useState<any>({});

    const hoverStyle = useMemo(
      () => ({
        color: "primary.500",
        background: "background.200",
      }),
      []
    );

    useEffect(() => {
      if (isActive) {
        setActiveStyle({
          ...hoverStyle,
          paddingLeft: "4",
          borderLeftWidth: "thick",
          fontWeight: "semibold",
          borderLeftColor: "primary.500",
          roundedLeft: "0",
        });
      } else {
        setActiveStyle({});
      }
    }, [hoverStyle, isActive]);

    return (
      <Link
        width="full"
        paddingY="3"
        paddingX="5"
        alignItems="center"
        color="text.500"
        ref={ref}
        display="flex"
        flexDirection="row"
        _focus={hoverStyle}
        _hover={hoverStyle}
        _active={activeStyle}
        {...activeStyle}
        {...props}
      >
        {leftIcon && <Icon name={leftIcon} marginRight="4" />}
        <Stack as="span" direction="row" spacing="5" justify="space-between">
          <Text color={activeStyle?.color}>{children}</Text>
        </Stack>
      </Link>
    );
  }
);

SidebarNavLink.displayName = "SidebarNavLink";
