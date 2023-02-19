import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useTranslations } from "@/hooks";
import { Navbar, Title } from "@stokei/ui";
import { FC } from "react";

interface CoursesNavbarProps {}

export const CoursesNavbar: FC<CoursesNavbarProps> = () => {
  const translate = useTranslations();
  return (
    <Navbar align="center" background="background.50" borderBottomWidth="thin">
      <SidebarOpenButton />
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "courses" })}
      </Title>
      <NavbarUserInformation />
    </Navbar>
  );
};
