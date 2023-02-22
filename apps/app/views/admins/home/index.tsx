import { Box } from "@stokei/ui";
import { FC } from "react";
import { AdminLayout } from "../layout";
import { Navbar } from "./components/navbar";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <AdminLayout>
      <Navbar />
      <Box width="full" flexDirection="row"></Box>
    </AdminLayout>
  );
};
