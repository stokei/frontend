import defaultLogoURL from "@/assets/no-image.png";
import { useSite, useTranslations } from "@/hooks";
import { AspectRatio, Image, ImageProps } from "@stokei/ui";

export interface AppLogoProps extends Omit<ImageProps, "src"> {}
export const AppLogo = ({ ...props }: AppLogoProps) => {
  const translate = useTranslations();
  const { site } = useSite();

  return (
    <AspectRatio
      width={["16", "16", "20", "20"]}
      ratio={16 / 9}
      alignItems="flex-start"
      justifyContent="flex-start"
      css={{
        "&>img": {
          objectFit: "contain",
          objectPosition: "left",
        },
      }}
    >
      <Image
        src={site?.logo?.file?.url || ""}
        fallbackSrc={defaultLogoURL.src}
        alt={translate.formatMessage({ id: "home" })}
        objectFit="contain"
        {...props}
      />
    </AspectRatio>
  );
};
