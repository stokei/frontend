const baseURL = "/courses";

export const routesCourse = {
  home: ({ product }: { product: string }) => baseURL + "/" + (product || ""),
};
