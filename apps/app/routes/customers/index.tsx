const baseURL = "/customers";

export const routesCustomers = {
  home: baseURL,
  courses: baseURL + "/courses",
  course: ({ course }: { course?: string }) => {
    const baseCourseURL = baseURL + "/courses/" + course;

    return {
      home: baseCourseURL,
      modules: baseCourseURL + "/modules",
      video: ({ video }: { video: string }) =>
        baseCourseURL + "/videos/" + video,
    };
  },
  subscriptions: {
    home: baseURL + "/subscriptions",
    subscription: ({ subscription }: { subscription?: string }) =>
      baseURL + "/subscriptions/" + subscription,
  },
  invoices: baseURL + "/invoices",
};
