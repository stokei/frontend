import { Icon, IconName } from "../icon";
import { Link, LinkProps } from "../link";
import { Text } from "../text";
import { Stack } from "../stack";

export interface NavbarNavLinkProps extends LinkProps {
  readonly icon?: IconName;
  readonly isActive?: boolean;
}

export const NavbarNavLink = ({
  children,
  icon,
  isActive,
  ...props
}: NavbarNavLinkProps) => {
  const hoverStyle = {
    background: "primary.50",
  };
  const activeStyle = isActive ? hoverStyle : {};
  return (
    <Link
      padding="2"
      paddingX="5"
      alignItems="center"
      color="primary.600"
      fontWeight="semibold"
      rounded="full"
      {...props}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      _hover={isActive ? activeStyle : hoverStyle}
      _active={activeStyle}
      {...activeStyle}
    >
      {icon && (
        <Icon
          name={icon}
          fontSize="lg"
          marginRight={!!children ? "2" : undefined}
        />
      )}
      {children}
    </Link>
  );
};
