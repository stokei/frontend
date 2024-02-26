import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { routes } from "@/routes";
import { Box, Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface StoreLayoutProps {}

export const StoreLayout = ({
  children,
}: PropsWithChildren<StoreLayoutProps>) => {
  return (
    <Box flex="1" flexDirection="column">
      <Navbar
        align="center"
        background="background.50"
        borderBottomWidth="thin"
      >
        <NavbarLogo href={routes.home} />
        <NavbarUserInformation />
      </Navbar>
      <Box flex="1" flexDirection="column">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
