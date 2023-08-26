import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useTranslations } from "@/hooks";
import { Navbar as NavbarUI, Title } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const translate = useTranslations();
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <SidebarOpenButton />
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "payment" })}
      </Title>
      <NavbarUserInformation />
    </NavbarUI>
  );
};
