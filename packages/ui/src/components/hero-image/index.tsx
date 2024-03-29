import { Image, ImageProps } from "../image";

export interface HeroImageProps extends ImageProps {}
export const HeroImage: React.FC<HeroImageProps> = ({ children, ...props }) => (
  <Image width="full" alt="default" {...props} />
);
