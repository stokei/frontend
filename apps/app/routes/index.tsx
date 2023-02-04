export const getRoutes = () => {
  return {
    home: "/",
    notFound: "/404",
    checkout: {
      home: ({ product }: { product: string }) =>
        "/checkout/" + (product || ""),
    },
    course: {
      home: ({ product }: { product: string }) => "/course/" + (product || ""),
    },
    plan: {
      home: ({ product }: { product: string }) => "/course/" + (product || ""),
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
