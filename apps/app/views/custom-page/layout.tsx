import { Footer, NavbarLogo, NavbarUserInformation } from "@/components";
import { Navbar } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { Loading } from "./loading";
import { PageBuilderProvider } from "@/contexts";

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
        <NavbarLogo />
        <NavbarUserInformation />
      </Navbar>
      {isLoading ? <Loading /> : <>{children}</>}
      <Footer />
    </PageBuilderProvider>
  );
};
