import { useCurrentApp } from "@/hooks";
import { BuilderProvider, BuilderProviderRoutes } from "@stokei/builder";
import { useStokeiGraphQLClient } from "@stokei/graphql";
import { appRoutes } from "@stokei/routes";
import { PropsWithChildren } from "react";

const builderRoutes: BuilderProviderRoutes = {
  customPage: ({ slug }) => appRoutes.customPage({ slug }).home,
  product: ({ product, price }) => appRoutes.product.home({ product, price }),
  store: ({ catalog }) =>
    appRoutes.store.home + (catalog ? "?catalog=" + catalog : ""),
};

export const PageBuilderProvider = ({ children }: PropsWithChildren) => {
  const stokeiGraphQLClient = useStokeiGraphQLClient();
  const { currentSite } = useCurrentApp();
  return (
    <BuilderProvider
      siteId={currentSite?.id || ""}
      routes={builderRoutes}
      stokeiGraphQLApi={stokeiGraphQLClient}
    >
      {children}
    </BuilderProvider>
  );
};
