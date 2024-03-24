export const getPageSlugFromContext = (context: any): string => {
  const slug =
    context?.query?.page?.toString() || context?.params?.page?.toString();
  return slug;
};
