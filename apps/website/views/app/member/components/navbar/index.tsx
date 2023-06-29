import {
  AppLogo,
  NavbarLogo,
  NavbarUserInformation,
  SidebarOpenButton,
} from "@/components";
import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Navbar as NavbarUI, Stack, Title } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const translate = useTranslations();
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
