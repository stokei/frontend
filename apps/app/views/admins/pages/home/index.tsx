import { NavbarUserInformation } from "@/components";
import { useTranslations } from "@/hooks";
import { Box, Navbar, Title } from "@stokei/ui";
import { FC } from "react";
import { HomeNavbar } from "../../components/home-navbar";
import { AdminLayout } from "../../layout";

interface AdminsHomePageProps {}

export const AdminsHomePage: FC<AdminsHomePageProps> = () => {
  const translate = useTranslations();

  return (
    <AdminLayout>
      <HomeNavbar />
      <Box width="full" flexDirection="row"></Box>
    </AdminLayout>
  );
};
