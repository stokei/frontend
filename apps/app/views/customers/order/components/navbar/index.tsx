import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { Navbar as NavbarUI, Spacer } from "@stokei/ui";

export const Navbar = () => {
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
