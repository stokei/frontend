export const removeRouteSitePrefix = (route: string): string => {
  return route?.replace("/site/[slug]", "");
};
