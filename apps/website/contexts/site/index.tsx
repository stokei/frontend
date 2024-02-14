import { useRouter } from "next/router";
import { createContext, FC, PropsWithChildren, useMemo } from "react";
import {
  SitePageSiteFragment,
  useGetSitePageSiteQuery,
} from "./graphql/site.query.graphql.generated";

export interface SiteProviderProps {}

export interface SiteProviderValues {
  readonly site?: SitePageSiteFragment;
  readonly siteId: string;
  readonly isLoadingSite: boolean;
}

export const SiteContext = createContext({} as SiteProviderValues);

export const SiteProvider: FC<PropsWithChildren<SiteProviderProps>> = ({
  children,
}) => {
  const router = useRouter();
  const siteId = router.query?.siteId?.toString() || "";

  const [{ fetching: isLoadingSite, data: dataGetSite }] =
    useGetSitePageSiteQuery({
      pause: !siteId,
      variables: {
        site: siteId,
      },
    });

  const site = useMemo(() => dataGetSite?.site, [dataGetSite?.site]);

  const values: SiteProviderValues = useMemo(
    () => ({
      site,
      siteId,
      isLoadingSite,
    }),
    [isLoadingSite, site, siteId]
  );

  return <SiteContext.Provider value={values}>{children}</SiteContext.Provider>;
};
