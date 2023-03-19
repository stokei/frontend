import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { routes } from "@/routes";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface ForgotPasswordLayoutProps {}

export const ForgotPasswordLayout: FC<
  PropsWithChildren<ForgotPasswordLayoutProps>
> = ({ children }) => {
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
