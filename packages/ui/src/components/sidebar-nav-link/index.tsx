import { Link, LinkProps } from "../link";

export interface SidebarNavLinkProps extends LinkProps {
  readonly isActive?: boolean;
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  children,
  isActive,
  ...props
}) => {
  const hoverStyle = {
    color: "primary.500",
    background: "background.200",
  };
  const activeStyle = isActive
    ? {
        ...hoverStyle,
        paddingLeft: "4",
        borderLeftWidth: "thick",
        fontWeight: "semibold",
        borderLeftColor: "primary.500",
        roundedLeft: "0",
      }
    : {};
  return (
    <Link
      width="full"
      padding="3"
      paddingX="5"
      alignItems="center"
      color="text.500"
      rounded="md"
      {...props}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      _focus={isActive ? activeStyle : hoverStyle}
      _hover={isActive ? activeStyle : hoverStyle}
      _active={activeStyle}
      {...activeStyle}
    >
      {children}
    </Link>
  );
};
