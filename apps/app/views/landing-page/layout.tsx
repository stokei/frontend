import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Box, Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface LandingPageLayoutProps {
  isLoading?: boolean;
}

export const LandingPageLayout: FC<
  PropsWithChildren<LandingPageLayoutProps>
> = ({ isLoading, children }) => {
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
