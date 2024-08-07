import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { appRoutes } from "@stokei/routes";
import {
  Avatar,
  Button,
  ButtonGroup,
  NavbarNavLink,
  Stack,
  StackProps,
  Text,
  useDisclosure,
} from "@stokei/ui";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ShoppingCartMenu } from "@stokei/builder";
import { NavbarUserInformationDrawer } from "../user-information-drawer";

export interface NavbarUserInformationProps extends StackProps { }
export const NavbarUserInformation = ({
  ...props
}: NavbarUserInformationProps) => {
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
      spacing="0"
      {...props}
    >
      <ShoppingCartMenu />
      <NavbarNavLink icon="store" as={NextLink} href={appRoutes.store.home}>
        <Text
          display={["none", "none", "block", "block"]}
          color="inherit"
          fontSize="inherit"
        >
          {translate.formatMessage({ id: "store" })}
        </Text>
      </NavbarNavLink>
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
        <ButtonGroup width="fit-content" spacing="0">
          <Button
            variant="ghost"
            onClick={() =>
              router.push({
                pathname: appRoutes.auth.login,
                query: {
                  redirectTo,
                },
              })
            }
          >
            {translate.formatMessage({ id: "login" })}
          </Button>
          <Button
            display={["none", "none", "block", "block"]}
            onClick={() =>
              router.push({
                pathname: appRoutes.auth.signUp,
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
