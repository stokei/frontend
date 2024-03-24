import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";

import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { Alerts } from "./components/alerts";

export const DashboardPage = () => {
  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Alerts />
        <Container>
          <Header />
        </Container>
      </Stack>
    </AppLayout>
  );
};
