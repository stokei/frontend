import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
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
        <NavbarUserInformation />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
