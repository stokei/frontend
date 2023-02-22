import { forwardRef, useEffect, useMemo, useState } from "react";
import { Link, LinkProps } from "../link";

export interface SidebarNavLinkProps extends LinkProps {
  readonly isActive?: boolean;
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = forwardRef(
  ({ children, isActive, ...props }, ref) => {
    const [activeStyle, setActiveStyle] = useState({});

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
    }, [isActive]);

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
        justifyContent="space-between"
        _focus={hoverStyle}
        _hover={hoverStyle}
        _active={activeStyle}
        {...activeStyle}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
