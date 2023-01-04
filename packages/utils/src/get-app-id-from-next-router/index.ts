export const getAppIdFromNextRouter = (router: any): string | undefined => {
  if (!router) {
    return;
  }
  return router?.query?.appId;
};
