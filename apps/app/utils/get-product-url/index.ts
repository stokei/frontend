import defaultNoImage from "@/assets/no-image.png";

export const getProductURL = (image?: string | null) => {
  if (!image) {
    return defaultNoImage?.src;
  }
  return image;
};
