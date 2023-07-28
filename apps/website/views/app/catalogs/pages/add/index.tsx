import { AppLayout } from "@/views/app/layout";
import { Container } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";

interface AddCatalogPageProps {}

export const AddCatalogPage: FC<AddCatalogPageProps> = () => {
  return (
    <AppLayout>
      <Navbar />
      <Container paddingTop="5">ADD CATALOG</Container>
    </AppLayout>
  );
};
