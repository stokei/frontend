import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  Avatar,
  Button,
  Icon,
  NavbarNavLink,
  Stack,
  StackProps,
  useDisclosure,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { NavbarUserInformationDrawer } from "../user-information-drawer";

export interface NavbarUserInformationProps extends StackProps {}
export const NavbarUserInformation = (props: NavbarUserInformationProps) => {
  const { isOpen: isOpenDrawer, onToggle: onToggleDrawer } = useDisclosure();

  const router = useRouter();
  const { currentAccount } = useCurrentAccount();
  const translate = useTranslations();
  const redirectTo = useMemo(
    () => router.query?.redirectTo?.toString() || "",
    [router]
  );

  return (
    <Stack
      width="auto"
      flex="1"
      align="center"
      justify="flex-end"
      direction="row"
      {...props}
    >
      {!!currentAccount ? (
        <>
          <NavbarUserInformationDrawer
            isOpen={isOpenDrawer}
            onClose={onToggleDrawer}
          />
          <Stack spacing="4" direction="row" justify="flex-end" align="center">
            <NavbarNavLink href={routes.apps.home} icon="home" />
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
        <>
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
        </>
      )}
    </Stack>
  );
};
