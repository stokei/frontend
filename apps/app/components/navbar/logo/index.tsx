import { BoxProps } from "@stokei/ui";
import { FC } from "react";
import { AppLogo } from "../../app-logo";

export interface NavbarLogoProps extends BoxProps {}
export const NavbarLogo: FC<NavbarLogoProps> = ({ ...props }) => (
  <AppLogo {...props} />
);
