import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useTranslations } from "@/hooks";
import { Navbar, Title } from "@stokei/ui";
import { FC } from "react";

interface HomeNavbarProps {}

export const HomeNavbar: FC<HomeNavbarProps> = () => {
  const translate = useTranslations();
  return (
    <Navbar align="center" background="background.50" borderBottomWidth="thin">
      <SidebarOpenButton />
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "dashboard" })}
      </Title>
      <NavbarUserInformation />
    </Navbar>
  );
};
