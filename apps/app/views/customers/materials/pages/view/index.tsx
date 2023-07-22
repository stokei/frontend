import { CustomerLayout } from "@/views/customers/layout";
import { Stack } from "@stokei/ui";
import { FC } from "react";
import { Navbar } from "./components/navbar";

interface MaterialViewPageProps {}

export const MaterialViewPage: FC<MaterialViewPageProps> = () => {
  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        OIE
      </Stack>
    </CustomerLayout>
  );
};
