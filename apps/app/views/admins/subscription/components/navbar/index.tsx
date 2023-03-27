import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useTranslations } from "@/hooks";
import { Navbar as NavbarUI, Title } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {
  readonly productName?: string;
}

export const Navbar: FC<NavbarProps> = ({ productName }) => {
  const translate = useTranslations();
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <SidebarOpenButton />
      <Title fontSize="md" lineHeight="shorter">
        {productName || translate.formatMessage({ id: "subscription" })}
      </Title>
      <NavbarUserInformation />
    </NavbarUI>
  );
};
