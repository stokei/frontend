import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { routes } from "@/routes";
import { Navbar } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface GenericProductLayoutProps {
  isLoading?: boolean;
}

export const GenericProductLayout: FC<
  PropsWithChildren<GenericProductLayoutProps>
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
