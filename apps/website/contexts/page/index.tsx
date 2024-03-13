import { GetVersionResponse } from "@/services/axios/models/version";
import { GlobalPageFragment } from "@/services/graphql/queries/get-page-by-id/page.query.graphql.generated";
import { useRouter } from "next/router";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface PageProviderProps {
  page?: GlobalPageFragment;
  version?: GetVersionResponse;
}

export interface PageProviderValues {
  version?: GetVersionResponse;
  page?: GlobalPageFragment;
  pageId: string;
  onChangePage: (currentPage: GlobalPageFragment) => void;
  onChangeVersion: (currentVersion: GetVersionResponse) => void;
}

export const PageContext = createContext({} as PageProviderValues);

export const PageProvider = ({
  version: versionProp,
  page: pageProp,
  children,
}: PropsWithChildren<PageProviderProps>) => {
  const router = useRouter();
  const [version, setVersion] = useState<GetVersionResponse | undefined>(
    versionProp
  );
  const [page, setPage] = useState<GlobalPageFragment | undefined>(pageProp);

  const pageId = router.query?.pageId?.toString() || "";

  const onChangePage = useCallback(
    (currentPage: GlobalPageFragment) => setPage(currentPage),
    []
  );
  const onChangeVersion = useCallback(
    (currentVersion: GetVersionResponse) => setVersion(currentVersion),
    []
  );

  const values = useMemo(
    () => ({
      version,
      page,
      pageId,
      onChangePage,
      onChangeVersion,
    }),
    [onChangePage, onChangeVersion, page, pageId, version]
  );

  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
};
