import defaultLogoURL from "@/assets/logo.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Image, Link, NavbarNavLink, Stack, StackProps } from "@stokei/ui";
import NextLink from "next/link";
import { FC } from "react";

export interface NavbarDefaultMenuProps extends StackProps {}
export const NavbarDefaultMenu: FC<NavbarDefaultMenuProps> = ({ ...props }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Stack
      direction="row"
      align="center"
      display={["none", "none", "flex", "flex"]}
      {...props}
    >
      <NavbarNavLink as={NextLink} href={getRoutes().home}>
        {translate.formatMessage({ id: "home" })}
      </NavbarNavLink>
      <NavbarNavLink as={NextLink} href={getRoutes().home}>
        {translate.formatMessage({ id: "courses" })}
      </NavbarNavLink>
      {!!currentApp?.isStokei && (
        <NavbarNavLink as={NextLink} href={getRoutes().plans.home}>
          {translate.formatMessage({ id: "plans" })}
        </NavbarNavLink>
      )}
    </Stack>
  );
};
