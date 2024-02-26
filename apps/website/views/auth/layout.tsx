import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { routes } from "@/routes";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";

export interface AuthLayoutProps {}

export const AuthLayout = ({
  children,
}: PropsWithChildren<AuthLayoutProps>) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={routes.home} />
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
