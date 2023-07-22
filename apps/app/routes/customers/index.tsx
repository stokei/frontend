const baseURL = "/customers";

export const routesCustomers = {
  home: baseURL + "/courses",
  products: baseURL + "/products",
  courses: baseURL + "/courses",
  materials: baseURL + "/materials",
  material: ({ material }: { material: string }) =>
    baseURL + "/materials/" + material,
  course: ({ course }: { course?: string }) => {
    const baseCourseURL = baseURL + "/courses/" + course;

    return {
      home: baseCourseURL,
      modules: baseCourseURL + "/modules",
      videos: baseCourseURL + "/videos",
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
