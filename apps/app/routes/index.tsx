import { routesAdmins } from "./admins";
import { routesAuth } from "./auth";
import { routesCheckout } from "./checkout";
import { routesProduct } from "./product";
import { routesCustomers } from "./customers";
import { routesMe } from "./me";

export const routes = {
  home: "/",
  notFound: "/404",
  checkout: routesCheckout,
  product: routesProduct,
  admins: routesAdmins,
  customers: routesCustomers,
  auth: routesAuth,
  me: routesMe,
};
