import { forwardRef, ReactElement, useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "../icon";
import { Link, LinkProps } from "../link";
import { Stack } from "../stack";
import { Text } from "../text";

export interface SidebarNavLinkProps extends LinkProps {
  readonly leftIcon?: IconName;
  readonly badge?: ReactElement;
  readonly isActive?: boolean;
}

export const SidebarNavLink = forwardRef(
  (
    { children, isActive, leftIcon, badge, ...props }: SidebarNavLinkProps,
    ref
  ) => {
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
        rounded="md"
        _focus={hoverStyle}
        _hover={hoverStyle}
        _active={activeStyle}
        {...activeStyle}
        {...props}
      >
        {leftIcon && <Icon name={leftIcon} marginRight="4" />}
        <Stack
          as="span"
          direction="row"
          spacing="5"
          justify="space-between"
          align="center"
        >
          <Text color={activeStyle?.color}>{children}</Text>
          {badge}
        </Stack>
      </Link>
    );
  }
);

SidebarNavLink.displayName = "SidebarNavLink";
