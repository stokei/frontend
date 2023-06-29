import { AppLayout } from "@/views/app/layout";
import { Container } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";

interface AddAppPageProps {}

export const AddAppPage: FC<AddAppPageProps> = () => {
  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">Add app</Container>
    </AppLayout>
  );
};
