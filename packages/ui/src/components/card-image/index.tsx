import React from "react";
import { ImageProps, Image } from "../image";

export interface CardImageProps extends ImageProps {}
export const CardImage: React.FC<CardImageProps> = ({ ...props }) => {
  return <Image width="full" roundedTop="md" {...props} />;
};
