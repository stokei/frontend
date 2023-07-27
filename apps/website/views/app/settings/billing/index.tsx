import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";
import { FC } from "react";
import { BillingList } from "./components/billing-list";
import { Header } from "./components/header";
import { Invoices } from "./components/invoices";
import { Navbar } from "./components/navbar";

interface BillingPageProps {}

export const BillingPage: FC<BillingPageProps> = () => {
  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Header />

          <BillingList />

          <Invoices />
        </Stack>
      </Container>
    </AppLayout>
  );
};
