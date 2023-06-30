import { NavbarLogo, NavbarUserInformation } from "@/components";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Navbar as NavbarUI } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { homePageURL } = useCurrentAccount();
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <NavbarLogo href={homePageURL} />
      <NavbarUserInformation />
    </NavbarUI>
  );
};
