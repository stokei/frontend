import { Icon, IconName } from "../icon";
import { Link, LinkProps } from "../link";
import { Text } from "../text";
import { Stack } from "../stack";

export interface NavbarNavLinkProps extends LinkProps {
  readonly icon?: IconName;
  readonly isActive?: boolean;
}

export const NavbarNavLink: React.FC<NavbarNavLinkProps> = ({
  children,
  icon,
  isActive,
  ...props
}) => {
  const hoverStyle = {
    background: "background.200",
  };
  const activeStyle = isActive ? hoverStyle : {};
  return (
    <Link
      padding="2"
      paddingX="5"
      alignItems="center"
      color="primary.900"
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
