import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { appRoutes } from "@stokei/routes";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";

export interface CheckoutLayoutProps {
  isLoading?: boolean;
}

export const CheckoutLayout = ({
  isLoading,
  children,
}: PropsWithChildren<CheckoutLayoutProps>) => {
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
