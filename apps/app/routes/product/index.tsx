const baseURL = "/products";

export const routesProduct = {
  home: ({ product }: { product: string }) => baseURL + "/" + (product || ""),
};
