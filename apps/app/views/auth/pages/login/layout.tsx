import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface LoginLayoutProps {}

export const LoginLayout: FC<PropsWithChildren<LoginLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
