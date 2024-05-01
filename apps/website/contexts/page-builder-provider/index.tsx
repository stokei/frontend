import { useSite } from "@/hooks";
import { BuilderProvider, BuilderProviderRoutes } from "@stokei/builder";
import { useStokeiGraphQLClient } from "@stokei/graphql";
import { appRoutes } from "@stokei/routes";
import { PropsWithChildren, useMemo } from "react";

export const PageBuilderProvider = ({ children }: PropsWithChildren) => {
  const stokeiGraphQLClient = useStokeiGraphQLClient();
  const { site, siteId } = useSite();

  const routes = useMemo<BuilderProviderRoutes>(() => {
    const mergeAppBaseURL = (route: string) =>
      `${site?.defaultDomain?.url || ""}${route || ""}`;

    return {
      checkout: () => mergeAppBaseURL(appRoutes.checkout.home),
      customPage: ({ slug }) =>
        mergeAppBaseURL(appRoutes.customPage({ slug }).home),
      product: ({ product, price }) =>
        mergeAppBaseURL(appRoutes.product.home({ product, price })),
      store: ({ catalog }) =>
        mergeAppBaseURL(
          appRoutes.store.home + (catalog ? "?catalog=" + catalog : "")
        ),
    };
  }, [site?.defaultDomain?.url]);

  return (
    <BuilderProvider siteId={siteId} routes={routes} stokeiGraphQLApi={stokeiGraphQLClient}>
      {children}
    </BuilderProvider>
  );
};
