export const routesApp = (data: { appId?: string }) => {
  const baseURL = `/apps/${data?.appId}`;
  return {
    home: baseURL,
    financial: baseURL + "/financial",
    subscriptions: {
      home: baseURL + "/subscriptions",
      subscription: ({ subscription }: { subscription?: string }) =>
        baseURL + "/subscriptions/" + subscription,
    },
    catalogs: {
      home: baseURL + "/catalogs",
      catalog: ({ catalog }: { catalog?: string }) =>
        baseURL + "/catalogs/" + catalog,
    },
    onboardings: {
      home: baseURL + "/onboardings",
      stripe: {
        home: baseURL + "/onboardings/stripe",
        refresh: baseURL + "/onboardings/stripe/refresh",
        callback: baseURL + "/onboardings/stripe/callback",
      },
    },
    courses: baseURL + "/courses",
    course: ({ course }: { course?: string }) => {
      const baseCourseURL = baseURL + "/course/" + (course || "");
      return {
        home: baseCourseURL,
        instructors: baseCourseURL + "/instructors",
        modules: {
          home: baseCourseURL + "/modules",
          addVideo: ({ module }: { module: string }) =>
            baseCourseURL + "/modules/" + module + "/videos/add",
          editVideo: ({ module, video }: { module: string; video: string }) =>
            baseCourseURL + "/modules/" + module + "/videos/" + video + "/edit",
        },
        students: baseCourseURL + "/students",
        settings: {
          home: baseCourseURL + "/settings",
        },
      };
    },
    invoices: baseURL + "/invoices",
    member: ({ member }: { member?: string }) => {
      const baseMemberURL = baseURL + "/members/" + (member || "");
      return {
        home: baseMemberURL,
      };
    },
    members: baseURL + "/members",
    product: ({ product }: { product: string }) => {
      const baseProductURL = baseURL + "/products/" + product;
      return {
        home: baseProductURL,
      };
    },
    products: {
      home: baseURL + "/products",
      add: baseURL + "/products/add",
    },
    settings: {
      home: baseURL + "/settings",
      landingPageBuilder: baseURL + "/settings/builder",
    },
  };
};
