import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface PlansLayoutProps {
  isLoading?: boolean;
}

export const PlansLayout: FC<PropsWithChildren<PlansLayoutProps>> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      <Navbar>
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </>
  );
};
