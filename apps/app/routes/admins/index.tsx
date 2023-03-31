const baseURL = "/admins";

export const routesAdmins = {
  home: baseURL,
  financial: baseURL + "/financial",
  subscriptions: {
    home: baseURL + "/subscriptions",
    subscription: ({ subscription }: { subscription?: string }) =>
      baseURL + "/subscriptions/" + subscription,
  },
  onboarding: {
    home: baseURL + "/onboarding",
    stripe: {
      home: baseURL + "/onboarding/stripe",
      refresh: baseURL + "/onboarding/stripe/refresh",
      callback: baseURL + "/onboarding/stripe/callback",
    },
  },
  courses: baseURL + "/courses",
  course: ({ course }: { course?: string }) => {
    const baseCourseURL = baseURL + "/course/" + (course || "");
    return {
      home: baseCourseURL,
      instructors: baseCourseURL + "/instructors",
      modules: baseCourseURL + "/modules",
      products: baseCourseURL + "/products",
      students: baseCourseURL + "/students",
    };
  },
  invoices: "/admins/invoices",
  members: "/admins/members",
  settings: {
    home: "/admins/settings",
  },
};
