import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { appRoutes } from "@stokei/routes";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface GenericProductLayoutProps {
  isLoading?: boolean;
}

export const GenericProductLayout = ({
  isLoading,
  children,
}: PropsWithChildren<GenericProductLayoutProps>) => {
  return (
    <>
      <Navbar>
        <NavbarLogo href={appRoutes.home} />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </>
  );
};
