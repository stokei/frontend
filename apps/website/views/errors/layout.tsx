import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { websiteRoutes } from "@stokei/routes";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface ErrorLayoutProps {}

export const ErrorLayout = ({
  children,
}: PropsWithChildren<ErrorLayoutProps>) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={websiteRoutes.home} />
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
