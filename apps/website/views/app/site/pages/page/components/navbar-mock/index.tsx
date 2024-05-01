import { Avatar, Navbar, NavbarNavLink, Spacer, Stack } from "@stokei/ui";
import { AppLogo } from "../app-logo";

export const NavbarMock = () => {
  return (
    <Navbar align="center" background="background.50" borderBottomWidth="thin">
      <AppLogo />
      <Spacer />
      <Stack spacing="4" direction="row" justify="flex-end" align="center">
        <NavbarNavLink icon="home" onClick={(e) => e.preventDefault()} />
        <Avatar cursor="pointer" size="sm" name="User" />
      </Stack>
    </Navbar>
  );
};
