import { Link, LinkProps } from "../link";

export interface FooterLinkProps extends LinkProps {
  readonly isActive?: boolean;
}

export const FooterLink = ({
  children,
  isActive,
  ...props
}: FooterLinkProps) => {
  const hoverStyle = {
    color: "primary.900",
    background: "background.200",
    rounded: "md",
  };
  const activeStyle = isActive
    ? {
        ...hoverStyle,
        fontWeight: "semibold",
      }
    : {};
  return (
    <Link
      padding="2"
      paddingX="5"
      alignItems="center"
      color="text.500"
      {...props}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      _hover={isActive ? activeStyle : hoverStyle}
      _active={activeStyle}
      {...activeStyle}
    >
      {children}
    </Link>
  );
};
