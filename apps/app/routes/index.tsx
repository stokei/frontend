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
    financial: "/financial",
    subscriptions: {
      home: "/admins/subscriptions",
    },
    courses: "/admins/courses",
    invoices: "/admins/invoices",
    members: {
      all: "/admins/members",
      admins: "/admins/members/admins",
      instructors: "/admins/members/instructors",
    },
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
