const baseURL = "/checkout";

export const routesCheckout = {
  home: ({
    product,
    clientSecret,
  }: {
    product: string;
    clientSecret?: string;
  }) =>
    baseURL +
    "/" +
    (product || "") +
    (clientSecret ? "?clientSecret=" + clientSecret : ""),
};
