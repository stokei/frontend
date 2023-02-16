export const getRoutes = () => {
  return {
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
        "?clientSecret=" +
        (clientSecret || ""),
    },
    course: {
      home: ({ product }: { product: string }) => "/courses/" + (product || ""),
    },
    plans: {
      home: "/plans",
    },
    admins: {
      home: "/admins",
    },
    customers: {
      home: "/customers",
    },
    login: "/auth/login",
    signUp: "/auth/signup",
    forgotPassword: "/auth/password/forgot",
    changePassword: "/auth/password/change",
  };
};
