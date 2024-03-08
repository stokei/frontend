export const getSiteSlugFromContext = (context: any): string => {
  const slug =
    context?.query?.slug?.toString() || context?.params?.slug?.toString();
  return slug;
};
