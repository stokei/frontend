import { Image, ImageProps } from "../image";

export interface HeroImageProps extends ImageProps {}
export const HeroImage = ({ children, ...props }: HeroImageProps) => (
  <Image width="full" alt="default" {...props} />
);
