export const getAppIdFromNextRouter = (router: any): string | undefined => {
  if (!router) {
    return;
  }
  const appIdFromQueryParams = router?.query?.appId;
  if (appIdFromQueryParams) {
    return appIdFromQueryParams;
  }
  const appId = router?.asPath?.split("/")?.[2];
  return appId;
};
