import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { Navbar as NavbarUI, Spacer } from "@stokei/ui";

export const Navbar = () => (
  <NavbarUI align="center" background="background.50" borderBottomWidth="thin">
    <SidebarOpenButton />
    <Spacer />
    <NavbarUserInformation />
  </NavbarUI>
);
