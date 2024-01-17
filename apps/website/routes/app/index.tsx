export const routesApp = (data: { appId?: string }) => {
  const baseURL = `/apps/${data?.appId}`;
  return {
    home: baseURL,
    financial: {
      home: baseURL + "/financial",
    },
    coupons: {
      home: baseURL + "/coupons",
    },
    subscriptions: {
      home: baseURL + "/subscriptions",
      add: baseURL + "/subscriptions/add",
      subscription: ({ subscription }: { subscription?: string }) =>
        baseURL + "/subscriptions/view/" + subscription,
    },
    catalog: ({ catalog }: { catalog?: string }) => {
      const baseCatalogURL = baseURL + "/catalogs/" + catalog;
      return {
        home: baseCatalogURL,
        products: baseCatalogURL + "/products",
      };
    },
    catalogs: {
      home: baseURL + "/catalogs",
      add: baseURL + "/catalogs/add",
    },
    onboardings: {
      home: baseURL + "/onboardings",
      pix: {
        home: baseURL + "/onboardings/pix",
        callback: baseURL + "/onboardings/pix/callback",
      },
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
        material: ({ material }: { material: string }) => {
          const baseMaterialURL = baseCourseURL + "/materials/view/" + material;
          return {
            home: baseMaterialURL,
          };
        },
        materials: {
          home: baseCourseURL + "/materials",
          add: baseCourseURL + "/materials/add",
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
        prices: baseProductURL + "/prices",
        features: baseProductURL + "/features",
      };
    },
    products: {
      home: baseURL + "/products",
      add: baseURL + "/products/add",
    },
    orders: {
      home: baseURL + "/orders",
      order: ({ order }: { order?: string }) => baseURL + "/orders/" + order,
    },
    payments: {
      home: baseURL + "/payments",
      payment: ({ payment }: { payment?: string }) =>
        baseURL + "/payments/" + payment,
    },
    material: ({ material }: { material: string }) => {
      const baseMaterialURL = baseURL + "/materials/view/" + material;
      return {
        home: baseMaterialURL,
      };
    },
    materials: {
      home: baseURL + "/materials",
      add: baseURL + "/materials/add",
    },
    settings: {
      home: baseURL + "/settings",
      billing: baseURL + "/settings/billing",
      website: baseURL + "/settings/website",
      domains: baseURL + "/settings/domains",
    },
  };
};
