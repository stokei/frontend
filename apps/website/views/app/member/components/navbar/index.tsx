import { NavbarLogo, NavbarUserInformation } from "@/components";
import { routes } from "@/routes";
import { Navbar as NavbarUI } from "@stokei/ui";

export const Navbar = () => {
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <NavbarLogo href={routes.home} />
      <NavbarUserInformation />
    </NavbarUI>
  );
};
