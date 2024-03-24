import { AppLogo, NavbarUserInformation } from "@/components";
import { Navbar as NavbarUI } from "@stokei/ui";

export const Navbar = () => {
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
