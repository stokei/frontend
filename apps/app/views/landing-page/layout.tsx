import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface LandingPageLayoutProps {
  isLoading?: boolean;
}

export const LandingPageLayout = ({
  isLoading,
  children,
}: PropsWithChildren<LandingPageLayoutProps>) => {
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
