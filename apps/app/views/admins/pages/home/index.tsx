import { NavbarUserInformation } from "@/components";
import { Box, Navbar, Title } from "@stokei/ui";
import { FC } from "react";
import { AdminLayout } from "../../layout";

interface AdminsHomePageProps {}

export const AdminsHomePage: FC<AdminsHomePageProps> = () => {
  return (
    <AdminLayout>
      <Navbar>
        <Title fontSize="md">AdminsHome</Title>
        <NavbarUserInformation />
      </Navbar>
      <Box width="full" flexDirection="row"></Box>
    </AdminLayout>
  );
};
