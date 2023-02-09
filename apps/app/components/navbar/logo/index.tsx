import defaultLogoURL from "@/assets/logo.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Box, BoxProps, Image, Link } from "@stokei/ui";
import NextLink from "next/link";
import { FC } from "react";

export interface NavbarLogoProps extends BoxProps {}
export const NavbarLogo: FC<NavbarLogoProps> = ({ ...props }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Box width="52" align="center" {...props}>
      <Link as={NextLink} href={getRoutes().home}>
        <Image
          width={["12", "12", "20", "20"]}
          height="fit-content"
          src={currentApp?.logo?.file?.url || ""}
          fallbackSrc={defaultLogoURL.src}
          alt={translate.formatMessage({ id: "home" })}
        />
      </Link>
    </Box>
  );
};
