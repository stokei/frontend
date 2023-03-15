import { routesAdmins } from "./admins";
import { routesAuth } from "./auth";
import { routesCheckout } from "./checkout";
import { routesCourse } from "./course";
import { routesCustomers } from "./customers";

export const routes = {
  home: "/",
  notFound: "/404",
  checkout: routesCheckout,
  course: routesCourse,
  admins: routesAdmins,
  customers: routesCustomers,
  auth: routesAuth,
};
