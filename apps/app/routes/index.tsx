export const getRoutes = () => {
  return {
    home: "/",
    notFound: "/404",
    checkout: {
      home: ({ price }: { price: string }) => "/checkout/" + (price || ""),
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
