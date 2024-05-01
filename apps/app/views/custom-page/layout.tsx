import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";
import { PageBuilderProvider } from "@/contexts";
import { appRoutes } from "@stokei/routes";

export interface CustomPageLayoutProps {
  isLoading?: boolean;
}

export const CustomPageLayout = ({
  isLoading,
  children,
}: PropsWithChildren<CustomPageLayoutProps>) => {
  return (
    <PageBuilderProvider>
      <Navbar>
        <NavbarLogo href={appRoutes.home} />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </PageBuilderProvider>
  );
};
