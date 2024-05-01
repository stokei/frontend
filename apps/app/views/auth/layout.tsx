import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { appRoutes } from "@stokei/routes";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface AuthLayoutProps {}

export const AuthLayout = ({
  children,
}: PropsWithChildren<AuthLayoutProps>) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={appRoutes.home} />
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
