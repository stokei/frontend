const baseURL = "/checkout";

export const routesCheckout = {
  callback: baseURL + "/callback",
  subscriptionRenew: (subscription: string) =>
    baseURL + `/subscription-renew/${subscription}`,
  home: baseURL,
};
