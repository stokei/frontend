const baseURL = "/admins";

export const routesAdmins = {
  home: baseURL,
  financial: baseURL + "/financial",
  subscriptions: {
    home: baseURL + "/subscriptions",
    subscription: ({ subscription }: { subscription?: string }) =>
      baseURL + "/subscriptions/" + subscription,
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
      },
      products: {
        home: baseCourseURL + "/products",
      },
      students: baseCourseURL + "/students",
    };
  },
  invoices: "/admins/invoices",
  members: "/admins/members",
  settings: {
    home: "/admins/settings",
  },
};
