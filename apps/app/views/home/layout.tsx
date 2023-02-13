import {
  Footer,
  NavbarLogo,
  NavbarDefaultMenu,
  NavbarUserInformation,
} from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface HomeLayoutProps {
  isLoading?: boolean;
}

export const HomeLayout: FC<PropsWithChildren<HomeLayoutProps>> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarDefaultMenu />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </>
  );
};
