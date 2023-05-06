import { Footer, NavbarAuthMenu, NavbarLogo } from "@/components";
import { routes } from "@/routes";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

export interface ErrorLayoutProps {}

export const ErrorLayout: FC<PropsWithChildren<ErrorLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={routes.home} />
        <NavbarAuthMenu />
      </Navbar>
      {children}
      <Footer />
    </>
  );
};
