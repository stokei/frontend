import { NavbarLogo, NavbarUserInformation } from "@/components";
import { Footer } from "@/components/footer";
import { Box, Navbar } from "@stokei/ui";
import { FC } from "react";
import { ProductsSection } from "./products-section";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      <Box paddingY="10">
        <ProductsSection />
      </Box>
      <Footer />
    </>
  );
};
