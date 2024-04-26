import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useCallback, useMemo } from "react";
import {
  SitePageSiteFragment,
  useGetSitePageSiteQuery,
} from "./graphql/site.query.graphql.generated";

export interface SiteProviderProps { }

export interface SiteProviderValues {
  readonly site?: SitePageSiteFragment;
  readonly siteId: string;
  readonly isLoadingSite: boolean;
  readonly onReloadSite: () => void
}

export const SiteContext = createContext({} as SiteProviderValues);

export const SiteProvider = ({
  children,
}: PropsWithChildren<SiteProviderProps>) => {
  const router = useRouter();
  const siteId = router.query?.siteId?.toString() || "";

  const [{ fetching: isLoadingSite, data: dataGetSite }, onExecuteReloadSite] =
    useGetSitePageSiteQuery({
      pause: !siteId,
      requestPolicy: 'network-only',
      variables: {
        site: siteId,
      },
    });

  const site = useMemo(() => dataGetSite?.site, [dataGetSite?.site]);

  const onReloadSite = useCallback(() => onExecuteReloadSite({ requestPolicy: 'network-only' }), [onExecuteReloadSite]);

  const values: SiteProviderValues = useMemo(
    () => ({
      site,
      siteId,
      isLoadingSite,
      onReloadSite
    }),
    [isLoadingSite, onReloadSite, site, siteId]
  );

  return <SiteContext.Provider value={values}>{children}</SiteContext.Provider>;
};
