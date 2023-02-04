import defaultLogoURL from "@/assets/logo.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Image, Link, Stack, StackProps } from "@stokei/ui";
import { FC } from "react";

export interface NavbarLogoProps extends StackProps {}
export const NavbarLogo: FC<NavbarLogoProps> = ({ ...props }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Stack align="center" direction="row" {...props}>
      <Link href={getRoutes().home}>
        <Image
          width={["12", "12", "20", "20"]}
          height="fit-content"
          src={currentApp?.logo?.file?.url || ""}
          fallbackSrc={defaultLogoURL.src}
          alt={translate.formatMessage({ id: "home" })}
        />
      </Link>
    </Stack>
  );
};
