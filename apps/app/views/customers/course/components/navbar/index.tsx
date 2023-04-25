import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useCustomersCourse } from "@/hooks";
import { Navbar as NavbarUI, Title } from "@stokei/ui";
import { FC } from "react";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { course } = useCustomersCourse();
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <SidebarOpenButton />
      <Title fontSize="md" lineHeight="shorter">
        {course?.name}
      </Title>
      <NavbarUserInformation />
    </NavbarUI>
  );
};
