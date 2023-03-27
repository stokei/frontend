import { AdminLayout } from "@/views/admins/layout";
import { Container, Stack } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";

interface SubscriptionContractPageProps {}

export const SubscriptionContractPage: FC<
  SubscriptionContractPageProps
> = () => {
  return (
    <AdminLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Container>Subscription</Container>
      </Stack>
    </AdminLayout>
  );
};
