const baseURL = "/admins";

export const routesAdmins = {
  home: "/admins",
  financial: "/financial",
  subscriptions: {
    home: "/admins/subscriptions",
  },
  courses: "/admins/courses",
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
