import defaultNoImage from "@/assets/no-image.png";

export interface GetProductAvatarURL {
  defaultAvatar?: string;
  productParent: any;
}

export const getProductAvatarURL = ({
  productParent,
  defaultAvatar,
}: GetProductAvatarURL): string => {
  if (productParent?.__typename === "Course") {
    return productParent?.avatar?.file?.url || "";
  }
  if (productParent?.__typename === "Material") {
    return productParent?.avatar?.file?.url || "";
  }
  if (productParent?.__typename === "App") {
    return productParent?.avatar?.file?.url || "";
  }
  return defaultAvatar ? defaultAvatar : defaultNoImage?.src;
};
