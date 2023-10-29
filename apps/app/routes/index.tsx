import { routesAuth } from "./auth";
import { routesCheckout } from "./checkout";
import { routesCustomers } from "./customers";
import { routesMe } from "./me";
import { routesProduct } from "./product";
import { routesStore } from "./store";

export const routes = {
  home: "/",
  notFound: "/404",
  checkout: routesCheckout,
  product: routesProduct,
  customers: routesCustomers,
  auth: routesAuth,
  me: routesMe,
  store: routesStore,
};
