import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface DynamicPageLayoutProps {
  isLoading?: boolean;
}

export const DynamicPageLayout = ({
  isLoading,
  children,
}: PropsWithChildren<DynamicPageLayoutProps>) => {
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
