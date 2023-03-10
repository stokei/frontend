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
    course: ({ course }: { course?: string }) => {
      const baseURL = "/admins/course/" + (course || "");
      return {
        home: baseURL,
        instructors: baseURL + "/instructors",
        modules: baseURL + "/modules",
        products: baseURL + "/products",
        students: baseURL + "/students",
      };
    },
    invoices: "/admins/invoices",
    members: "/admins/members",
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
