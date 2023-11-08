import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  NavbarNavLink,
  Stack,
  StackProps,
  useDisclosure,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { ShoppingCartMenu } from "../shopping-cart-menu";
import { NavbarUserInformationDrawer } from "../user-information-drawer";

export interface NavbarUserInformationProps extends StackProps {}
export const NavbarUserInformation: FC<NavbarUserInformationProps> = ({
  ...props
}) => {
  const { isOpen: isOpenDrawer, onToggle: onToggleDrawer } = useDisclosure();

  const router = useRouter();
  const { currentAccount, homePageURL } = useCurrentAccount();
  const translate = useTranslations();
  const redirectTo = useMemo(
    () => router.query?.redirectTo?.toString() || "",
    [router]
  );

  return (
    <Stack
      width="fit-content"
      align="center"
      justify="flex-end"
      direction="row"
      spacing="2"
      {...props}
    >
      <ShoppingCartMenu />
      {!!currentAccount ? (
        <>
          <NavbarUserInformationDrawer
            isOpen={isOpenDrawer}
            onClose={onToggleDrawer}
          />
          <Stack
            width="fit-content"
            spacing="4"
            direction="row"
            justify="flex-end"
            align="center"
          >
            <NavbarNavLink as={NextLink} href={homePageURL} icon="home" />
            <Avatar
              cursor="pointer"
              size="sm"
              name={currentAccount?.fullname}
              src={currentAccount?.avatar?.file?.url || ""}
              onClick={onToggleDrawer}
            />
          </Stack>
        </>
      ) : (
        <ButtonGroup width="fit-content">
          <Button
            variant="ghost"
            onClick={() =>
              router.push({
                pathname: routes.auth.login,
                query: {
                  redirectTo,
                },
              })
            }
          >
            {translate.formatMessage({ id: "login" })}
          </Button>
          <Button
            onClick={() =>
              router.push({
                pathname: routes.auth.signUp,
                query: {
                  redirectTo,
                },
              })
            }
          >
            {translate.formatMessage({ id: "signUp" })}
          </Button>
        </ButtonGroup>
      )}
    </Stack>
  );
};
