export const routes = {
  home: "/",
  notFound: "/404",
  checkout: {
    home: ({
      product,
      clientSecret,
    }: {
      product: string;
      clientSecret?: string;
    }) =>
      "/checkout/" +
      (product || "") +
      (clientSecret ? "?clientSecret=" + clientSecret : ""),
  },
  course: {
    home: ({ product }: { product: string }) => "/courses/" + (product || ""),
  },
  plans: {
    home: "/plans",
  },
  admins: {
    home: "/admins",
    balances: "/balances",
    subscriptions: "/admins/subscriptions",
    admins: "/admins/admins",
    instructors: "/admins/instructors",
    courses: "/admins/courses",
    students: "/admins/students",
    settings: {
      home: "/admins/settings",
    },
  },
  customers: {
    home: "/customers",
  },
  login: "/auth/login",
  signUp: "/auth/signup",
  forgotPassword: "/auth/password/forgot",
  changePassword: "/auth/password/change",
};
