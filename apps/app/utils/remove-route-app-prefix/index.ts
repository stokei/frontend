export const removeRouteAppPrefix = (route: string): string => {
  return route?.replace("/app/[slug]", "");
};
