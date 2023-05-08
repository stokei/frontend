import defaultLogoURL from "@/assets/logo.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { Image, ImageProps } from "@stokei/ui";
import { FC } from "react";

export interface AppLogoProps extends Omit<ImageProps, "src"> {}
export const AppLogo: FC<AppLogoProps> = ({ ...props }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Image
      width={["16", "16", "20", "20"]}
      src={currentApp?.logo?.file?.url || ""}
      fallbackSrc={defaultLogoURL.src}
      alt={translate.formatMessage({ id: "home" })}
      {...props}
    />
  );
};
