const baseURL = "/checkout";

export const routesCheckout = {
  callback: baseURL + "/callback",
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
