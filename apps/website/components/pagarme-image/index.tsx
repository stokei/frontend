import pagarmeImage from "@/assets/pagarme.png";
import { useTranslations } from "@/hooks";
import { Image, ImageProps } from "@stokei/ui";

export interface PagarmeImageProps extends ImageProps {}
export const PagarmeImage = ({ ...props }: PagarmeImageProps) => {
  const translate = useTranslations();
  return (
    <Image
      width="24"
      src={pagarmeImage.src}
      fallbackSrc={pagarmeImage.blurDataURL}
      {...props}
      alt={translate.formatMessage({ id: "pagarmeOnboarding" })}
    />
  );
};
