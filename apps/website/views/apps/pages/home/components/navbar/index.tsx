import { AppLogo, NavbarUserInformation } from "@/components";
import { Navbar as NavbarUI } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <AppLogo />
      <NavbarUserInformation />
    </NavbarUI>
  );
};
