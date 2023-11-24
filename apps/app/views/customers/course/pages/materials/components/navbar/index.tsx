import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { Navbar as NavbarUI, Spacer } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <SidebarOpenButton />
      <Spacer />
      <NavbarUserInformation />
    </NavbarUI>
  );
};
