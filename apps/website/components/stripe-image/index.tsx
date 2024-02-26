import stripeImage from "@/assets/stripe.png";
import { useTranslations } from "@/hooks";
import { Image, ImageProps } from "@stokei/ui";
import { FC } from "react";

export interface StripeImageProps extends ImageProps {}
export const StripeImage: FC<StripeImageProps> = ({ ...props }) => {
  const translate = useTranslations();
  return (
    <Image
      width="24"
      src={stripeImage.src}
      fallbackSrc={stripeImage.blurDataURL}
      {...props}
      alt={translate.formatMessage({ id: "stripeOnboarding" })}
    />
  );
};
