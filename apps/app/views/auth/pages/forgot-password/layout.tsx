import {
  Footer,
  NavbarDefaultMenu,
  NavbarLogo,
  NavbarUserInformation,
} from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface ForgotPasswordLayoutProps {}

export const ForgotPasswordLayout: FC<
  PropsWithChildren<ForgotPasswordLayoutProps>
> = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarDefaultMenu />
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
