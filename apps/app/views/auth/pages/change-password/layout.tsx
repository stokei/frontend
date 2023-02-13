import {
  Footer,
  NavbarDefaultMenu,
  NavbarLogo,
  NavbarUserInformation,
} from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface ChangePasswordLayoutProps {}

export const ChangePasswordLayout: FC<
  PropsWithChildren<ChangePasswordLayoutProps>
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
