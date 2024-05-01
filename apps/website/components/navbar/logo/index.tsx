import { Link, LinkProps } from "@stokei/ui";
import NextLink from "next/link";

import { AppLogo } from "../../app-logo";

export interface NavbarLogoProps extends LinkProps {}
export const NavbarLogo = ({ ...props }: NavbarLogoProps) => (
  <Link as={NextLink} {...props}>
    <AppLogo />
  </Link>
);
