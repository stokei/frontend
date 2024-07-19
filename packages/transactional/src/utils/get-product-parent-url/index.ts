import { appRoutes, websiteRoutes } from "@stokei/routes";
import { AppModel } from "../../types";

export const getProductParentURLFromAppRoutes = (
  app: AppModel,
  productId: string
) => {
  const productTypes: Record<string, string> = {
    material: appRoutes.customers.material({ material: productId }),
    course: appRoutes.customers.course({ course: productId }).home,
    prod: appRoutes.product.home({ product: productId }),
  };
  const productTypeIdList = productId?.split("_") || [];
  const productType = productTypeIdList
    ?.slice(0, productTypeIdList.length - 1)
    ?.join("_");
  const pathname = productTypes[productType];
  return `${app.url}${pathname || ""}`;
};

export const getProductParentURLFromWebsiteRoutes = (
  app: AppModel,
  productId: string
) => {
  const productTypes: Record<string, string> = {
    material: websiteRoutes
      .app({ appId: app.id })
      .material({ material: productId }).home,
    course: websiteRoutes.app({ appId: app.id }).course({ course: productId })
      .home,
  };
  const productTypeIdList = productId?.split("_") || [];
  const productType = productTypeIdList
    ?.slice(0, productTypeIdList.length - 1)
    ?.join("_");
  return `${app.url}${productTypes[productType]}`;
};
