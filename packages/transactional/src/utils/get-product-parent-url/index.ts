import { appRoutes } from "@stokei/routes";
import { AppModel } from "../../types";

export const getProductParentURL = (app: AppModel, productId: string) => {
  const productTypes: Record<string, string> = {
    material: appRoutes.customers.material({ material: productId }),
    course: appRoutes.customers.course({ course: productId }).home,
  };
  const productTypeIdList = productId?.split("_") || [];
  const productType = productTypeIdList
    ?.slice(0, productTypeIdList.length - 1)
    ?.join("_");
  return `${app.url}${productTypes[productType]}`;
};
