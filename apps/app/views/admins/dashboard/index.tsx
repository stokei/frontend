import { AdminLayout } from "@/views/admins/layout";
import { Container, Stack } from "@stokei/ui";
import { FC } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { Alerts } from "./components/alerts";

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <AdminLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Alerts />
        <Container>
          <Header />
        </Container>
      </Stack>
    </AdminLayout>
  );
};
