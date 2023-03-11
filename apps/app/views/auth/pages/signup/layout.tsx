import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface SignUpLayoutProps {}

export const SignUpLayout: FC<PropsWithChildren<SignUpLayoutProps>> = ({
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
