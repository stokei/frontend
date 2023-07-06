import { NavbarUserInformation, NavbarLogo } from "@/components";
import { routes } from "@/routes";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";
import { Loading } from "./loading";
import { Footer } from "./components/footer";

export interface LandingPageLayoutProps {
  isLoading?: boolean;
}

export const LandingPageLayout: FC<
  PropsWithChildren<LandingPageLayoutProps>
> = ({ isLoading, children }) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={routes.home} />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </>
  );
};
