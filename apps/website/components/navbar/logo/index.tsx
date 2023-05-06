import { Link, LinkProps } from "@stokei/ui";
import NextLink from "next/link";
import { FC } from "react";
import { AppLogo } from "../../app-logo";

export interface NavbarLogoProps extends LinkProps {}
export const NavbarLogo: FC<NavbarLogoProps> = ({ ...props }) => (
  <Link as={NextLink} {...props}>
    <AppLogo />
  </Link>
);
